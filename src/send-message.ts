import request from 'request'
import * as S from '@eyedea/syncano'

interface Args {
  text: string
  sender: string
  attachment: any
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const sendMessage = (messageData, sender) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: config.FACEBOOK_APP_TOKEN},
        method: 'POST',
        json: {
          recipient: {id: sender},
          message: messageData
        }
      }, function (error, response) {
        if (error) {
          console.log('Error sending message: ', error)
        } else if (response.body.error) {
          console.log('Error: ', response.body.error)
        }
      })
    }

    sendMessage({text: args.text}, args.sender)

    if (args.attachment) {
      sendMessage({attachment: args.attachment}, args.sender)
    }
  }
}

export default ctx => new Endpoint(ctx)
