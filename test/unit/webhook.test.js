/* global describe it */
import {run} from '@syncano/test'

describe('webhook', function () {
  it('Checks hub args - correct token', async () => {
    const args = {
      'hub.mode': 'subscribe',
      'hub.verify_token': 'messenger-bot'
    }
    const result = await run('webhook', {args})
    expect(result).toHaveProperty('code', 200)
  }),
  it('Checks hub args - wrong token', async () => {
    const args = {
      'hub.mode': 'subscribe',
      'hub.verify_token': 'test-bot'
    }
    const result = await run('webhook', {args})
    expect(result).toHaveProperty('code', 400)
  }),
  it('Checks message sender event', async () => {
    require('@syncano/core').__setMocks({
      event: {
        emit: (eventName, data) => {
          return ({eventName, data})
        }
      }  
    })
    const args ={ 
      "entry": [
        {
          "id": "<PAGE_ID>",
          "time": 1458692752478,
          "messaging": [{
              "sender": {
                "id": "<PSID>"
              },
              "recipient": {
                "id": "<PAGE_ID>"
              },
              "message": {
                "text": "hello, world!"
              }
          }]
        }
      ]
    }
    const result = await run('webhook', {args})
    expect(result).toHaveProperty('data.data.text', 'hello, world!')
    expect(result).toHaveProperty('data.eventName', 'message-received')
  })
})
