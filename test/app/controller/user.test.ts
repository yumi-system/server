import * as assert from 'assert'
import { app } from 'egg-mock/bootstrap'

describe('test/user/controller/user.test.ts', () => {
  it('should GET /user/:id', async () => {
    const result = await app
      .httpRequest()
      .get('/user/1')
      .expect(200)
    const parsedResult = JSON.parse(result.text)
    assert(parsedResult.name === 'testUser')
  })
})
