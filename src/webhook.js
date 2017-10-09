import Server from 'syncano-server'

export default (ctx) => {
  const {event, logger, response} = Server(ctx)
  const {debug} = logger('webhook')

  if (ctx.args['hub.mode'] === 'subscribe') {
    if (ctx.args['hub.verify_token'] === 'messenger-bot') {
      response(ctx.args['hub.challenge'])
    } else {
      response('Wrong token!', 400)
    }
  }

  if (ctx.args.entry && ctx.args.entry[0] && ctx.args.entry[0].messaging) {
    const messagingEvents = ctx.args.entry[0].messaging
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
}
