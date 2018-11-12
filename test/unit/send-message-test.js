/* global describe it */
import {run} from '@syncano/test'

describe('send-message', function () {

  it('Checks arguments - correct', async () => {

    const args = {
      'text': 'test message',
      'sender': 'asd'
    }

    const result = await run('send-message', {args})
    expect(result).toHaveProperty('code', 400)
  })
})
