import Syncano from '@syncano/core'
import request from 'request'

export default async ctx => {
  const {response} = new Syncano(ctx)
  const {text, sender, attachment} = ctx.args

  if ((text || attachment) && sender) {
    const sendMessage = (messageData, recipient) => {
      request(
        {
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token: ctx.config.FACEBOOK_APP_TOKEN},
          method: 'POST',
          json: {
            recipient: {id: recipient},
            message: messageData,
          },
        },
        function(error: any, res: any) {
          if (error) {
            return response(error, 400)
          } else if (res.body.error) {
            return response(res.body.error, 400)
          }
        }
      )
    }
    sendMessage({text}, sender)

    if (attachment) {
      sendMessage({attachment}, sender)
    }
  } else {
    return response('Wrong arguments', 400)
  }
}
