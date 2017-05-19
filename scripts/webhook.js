import {logger, event, response} from 'syncano-server'

const {debug} = logger('webhook.js');

if (ARGS['hub.mode'] === 'subscribe') {
  if (ARGS['hub.verify_token'] === 'messenger-bot') {
    response(ARGS['hub.challenge']);
  } else {
    response('Wrong token!', 400);
  }
}

if (ARGS.entry && ARGS.entry[0] && ARGS.entry[0].messaging) {
  const messaging_events = ARGS.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
      const fbEvent = messaging_events[i]
      const sender = fbEvent.sender.id
      if (fbEvent.message && fbEvent.message.text) {
          const text = fbEvent.message.text
          debug('Sending event', {text, sender})
          event.emit('message-received', {text, sender})
      }
  }
}
