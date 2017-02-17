import connect from 'syncano-server'
import {debug} from './helpers/debug';

const s = connect() // Connect to Syncano

console.log(ARGS, META)

if (ARGS['hub.mode'] === 'subscribe') {
  if (ARGS['hub.verify_token'] === 'messenger-bot') {
    setResponse(new HttpResponse(200, ARGS['hub.challenge'], 'text/plain'));
  } else {
    setResponse(new HttpResponse(400, 'Wrong token!', 'text/plain'));
  }
}

if (ARGS.entry && ARGS.entry[0] && ARGS.entry[0].messaging) {
  const messaging_events = ARGS.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
      let event = messaging_events[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
          let text = event.message.text
          // Sending event
          debug('m-bot-msg-rec', JSON.stringify({text, sender}))
          s.event.emit('m-bot-msg-rec', {text, sender})
      }
  }
}
