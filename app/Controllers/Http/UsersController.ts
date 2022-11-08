import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContentUser from 'App/Models/ContentUser';
import Trail from 'App/Models/Trail'
import User from 'App/Models/User'

export default class UsersController {

  public async show({ auth, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()

    try {
      const user = await User.query().where('id', userAuth.id).preload('trails').firstOrFail()

      return response.status(200).send(user)
    } catch (error) {
      console.log(error)
    }

  }

  public async signTrail({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const { idTrail } = request.all()

    try {
      const trail = await Trail.findOrFail(idTrail)

      await user.related('trails').attach([trail.id]);

      return response.status(200).send({ message: `Usuário cadastrado na trilha ${trail.name}` })
    } catch (error) {
      console.log(error)
    }
  }

  public async getTrails({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    try {
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

      const contentUser = await ContentUser.query().where('user_id', user.id).andWhere('content_id', idContent).first()

      if (!contentUser) {
        const contentUserCreated = await ContentUser.create({
          content_id: idContent,
          user_id: user.id,
          status: status,
        })

        return response.status(201).send(contentUserCreated)
      } else {
        contentUser.status = status
        contentUser.save()

        return response.status(200).send(contentUser)
      }

    } catch (error) {
      console.log(error)
    }
  }

  public async getAssociatedContentByTrail({ auth, response, request }: HttpContextContract) {

    const user = await auth.authenticate()
    const query = request.only(['id_trail'])

    try {

      const contentsTrail = await user.related('contents').query().where('trail_id', query.id_trail)

      let idsContent: string[] = []

      contentsTrail.forEach(async (content) => idsContent.push(content.id))

      const contentsUser = await ContentUser.query().where('user_id', user.id).andWhereIn('content_id', idsContent)

      return response.status(200).send(contentsUser)
    } catch (error) {
      console.log(error)
    }
  }

  public async setFavoriteContent({ response, auth, request }: HttpContextContract) {

    try {
      const user = await auth.authenticate()

      const { idContent, favorite } = request.all()

      const contentUser = await ContentUser.query().where('user_id', user.id).andWhere('content_id', idContent).first()

      if (!contentUser) {
        const contentUserCreated = await ContentUser.create({
          content_id: idContent,
          user_id: user.id,
          favorite: favorite
        })

        return response.status(201).send(contentUserCreated)
      } else {
        contentUser.favorite = favorite;
        contentUser.save()
        return response.status(200).send(contentUser)
      }

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
