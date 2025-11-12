import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth'

export default class AuthController {
  public async login(ctx: HttpContext) {
    await ctx.request.validateUsing(loginValidator)
    const { ...input } = ctx.request.body()
    // return await User.findBy('email', input.email)
    const user = await User.verifyCredentials(input.email, input.password)
    const token = await User.accessTokens.create(user)

    return {
      name: user.fullName,
      email: user.email,
      token: token.value!.release(),
    }
  }

  // public async me(ctx: HttpContext) {
  //   const id = ctx.auth.user?.id
  //   if (!id) {
  //     return ctx.response.status(401).send({ error: 'unauthorized' })
  //   }
  //   return ctx.response.status(200)
  // }
   public async me(ctx: any) {
    try {
      const user = await ctx.auth.use('api').authenticate()
      return ctx.response.json(user)
    } catch {
      return ctx.response.status(401).json({ error: 'unauthorized' })
    }
  }
}
