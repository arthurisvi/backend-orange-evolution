import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content';
import ContentUser from 'App/Models/ContentUser';
import Trail from 'App/Models/Trail'
import User from 'App/Models/User'
import { Status } from 'App/Models/Enums/Status';
import { Request } from '@adonisjs/core/build/standalone';

export default class UsersController {

  public async show({ auth, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    
    try {
      const user = await User.query().preload('trails', (query) => {
        query.where('user_id', userAuth.id)
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

      const contents = await Content.all();

      if (contents.length > 0) {
        contents.forEach(async (content) => {
          if (content.trailId === idTrail || !content.trailId) {
            await ContentUser.create({
              content_id: content.id,
              user_id: idUser,
              status: Status.NOT_STARTED
            })
          }
        })
      }

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

  public async setContentStatus({ request, response }: HttpContextContract) {
    const { idContent, idUser, status } = request.all()

    try {

      const contentUser = await ContentUser.query().where('user_id', idUser).andWhere('content_id', idContent).firstOrFail()

      contentUser.status = status

      contentUser.save()
      return response.status(200).send(contentUser)
    } catch (error) {
      console.log(error)
    }
  }

  public async getAssociatedContentByTrail({ auth, response, request }: HttpContextContract) {

    const user = await auth.authenticate()
    const query = request.only(['id_trail'])

    try {

      const contentsTrail = await user.related('contents').query().where('trail_id', query.id_trail)

      let idsContent: number[] = []

      contentsTrail.forEach(async (content) => idsContent.push(content.id))

      const contentsUser = await ContentUser.query().where('user_id', user.id).andWhereIn('content_id', idsContent)

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
      
      contentUser.favorite = true;

      contentUser.save()
      
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
