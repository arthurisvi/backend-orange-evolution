import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserIsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    const user = await auth.authenticate()

    if (user.tag !== 'admin') {
      return response.unauthorized({ message: 'Você não tem permissão para realizar tal ação.' })
    }

    await next()
  }
}
