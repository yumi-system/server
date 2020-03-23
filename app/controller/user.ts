import { Controller } from 'egg'

export default class UserController extends Controller {
  public async info() {
    const { ctx } = this
    ctx.body = {
      name: 'testUser',
    }
  }
}
