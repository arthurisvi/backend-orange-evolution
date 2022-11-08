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

      return response.status(200).send({ message: `Usuário cadastrado na trilha ${trail.name}` })
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

  public async setContentStatus({ auth, request, response }: HttpContextContract) {
    const { idContent, status } = request.all()
    const user = await auth.authenticate()

    try {

      const contentUser = await ContentUser.query().where('user_id', user.id).andWhere('content_id', idContent).firstOrFail()

      if (!contentUser) {
        await ContentUser.create({
              content_id: idContent,
              user_id: user.id,
              status: status
        })
      } else {
        contentUser.status = status
        contentUser.save()
      }

      return response.status(200).send(contentUser)
    } catch (error) {
      console.log(error)
    }
  }

  public async getAssociatedContentByTrail({ params, response, request }: HttpContextContract) {

    const { id } = params
    const query = request.only(['id_trail'])

    try {

      const user = await User.findOrFail(id)

      const contentsTrail = await user.related('contents').query().where('trail_id', query.id_trail)

      let idsContent: string[] = []

      contentsTrail.forEach(async (content) => idsContent.push(content.id))

      const contentsUser = await ContentUser.query().where('user_id', id).andWhereIn('content_id', idsContent)

      return response.status(200).send(contentsUser)
    } catch (error) {
      console.log(error)
    }
  }

  public async setFavoriteContent({ response, auth, request }: HttpContextContract){

    try {
      const user = await auth.authenticate()

      const {idContent} = request.all()

      const contentUser = await ContentUser.query().where('user_id', user.id).andWhere('content_id', idContent).firstOrFail()

      if (!contentUser) {
        await ContentUser.create({
          content_id: idContent,
          user_id: user.id,
          favorite: true
        })
      } else {
        contentUser.favorite = true;
        contentUser.save()
      }

      return response.status(200).send(contentUser)
    } catch (error) {
     console.log(error)
    }
  }

  public async getFavoriteContents({ response, auth }: HttpContextContract) {
    try {

      const user = await auth.authenticate()

      const favoritedsContents = await ContentUser.query().where('favorite', true).andWhere('user_id', user.id)

      return response.status(200).send(favoritedsContents)
    } catch (error) {
      console.log(error)
    }
  }
}
