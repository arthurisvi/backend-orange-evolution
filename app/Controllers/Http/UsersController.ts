import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContentUser from 'App/Models/ContentUser';
import Trail from 'App/Models/Trail'
import User from 'App/Models/User'

export default class UsersController {

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const user = await User.query().preload('trails', (query) => {
        query.where('user_id', id)
      });

      return response.status(200).send(user)
    } catch (error) {
      console.log(error)
    }

  }

  public async signTrail({ request, response }: HttpContextContract) {
    const { idTrail, idUser } = request.all()

    try {

      const user = await User.findOrFail(idUser)
      const trail = await Trail.findOrFail(idTrail)

      await user.related('trails').attach([trail.id]);

      return response.status(200).send({message: `Usuário cadastrado na trilha ${trail.name}`})
    } catch (error) {
      console.log(error)
    }
  }

  public async getTrails({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const user = await User.findOrFail(id)
      const trails = await user.related('trails').query()

      return response.status(200).send(trails)
    } catch (error) {
      console.log(error)
    }

  }

  public async setContentStatus({request, response}: HttpContextContract){
    const { idContent, idUser, status } = request.all()

    try {

      const contentUser = await ContentUser.query().where('user_id', idUser).andWhere('content_id', idContent).firstOrFail()

      contentUser.status = status

      contentUser.save
      return response.status(200).send(contentUser)
    } catch (error) {
      console.log(error)
    }
  }
}
