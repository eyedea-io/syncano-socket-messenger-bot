import * as S from '@eyedea/syncano'

interface Entry {
  messaging: Event[]
}

interface Event {
  sender: Sender
  message: Message
}

interface Message {
  text: string
}

interface Sender {
  id: number
}

interface Args {
  entry: Entry[]
}

class Endpoint extends S.Endpoint {
  async run(
    {response, event}: S.Core,
    {args}: S.Context<Args>
  ) {
    const {debug} = this.logger

    if (args['hub.mode'] === 'subscribe') {
      if (args['hub.verify_token'] === 'messenger-bot') {
        return response(args['hub.challenge'])
      } else {
        return response('Wrong token!', 400)
      }
    }

    if (args.entry && args.entry[0] && args.entry[0].messaging) {
      const messagingEvents = args.entry[0].messaging
      for (let i = 0; i < messagingEvents.length; i++) {
        const fbEvent = messagingEvents[i]
        const sender = fbEvent.sender.id

        if (fbEvent.message && fbEvent.message.text) {
          const text = fbEvent.message.text
          debug('Sending event', {text, sender})

          return event.emit('message-received', {text, sender})
        }
      }
    }

    return response('Wrong arguments', 400)
  }
}

export default ctx => new Endpoint(ctx)