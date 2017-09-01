import request from 'request';
import {logger, event, response} from 'syncano-server'


const {debug} = logger('send-message.js');

function sendMessage(messageData, sender) {
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: CONFIG.FACEBOOK_APP_TOKEN},
      method: 'POST',
      json: {
          recipient: { id: sender},
          message: messageData,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending message: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}

sendMessage({text: ARGS.text}, ARGS.sender);

if (ARGS.attachment) {
  sendMessage({attachment: ARGS.attachment}, ARGS.sender);
}
