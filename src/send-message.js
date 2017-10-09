import request from 'request'

export default (ctx) => {
  const sendMessage = (messageData, sender) => {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: ctx.config.FACEBOOK_APP_TOKEN},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: messageData
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending message: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }

  sendMessage({text: ctx.args.text}, ctx.args.sender)

  if (ctx.args.attachment) {
    sendMessage({attachment: ctx.args.attachment}, ctx.args.sender)
  }
}
