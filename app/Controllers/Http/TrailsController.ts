import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content';
import ContentUser from 'App/Models/ContentUser';
import Trail from 'App/Models/Trail';

export default class TrailsController {
  public async index({ response }: HttpContextContract) {
    try {
      const trails = await Trail.all();

      return response.status(200).send(trails)
    } catch (error) {
      console.log(error)
    }
  }

  public async getContents({ response, params, auth}: HttpContextContract) {
    try {
      const user = await auth.authenticate()

      const { id } = params;

      const trail = await Trail.findOrFail(id);

      const trailUser = await user.related('trails').query().where('trail_id', id).first()

      if (!trailUser) {
        let contents = await Content.query().where('trail_id', id).orWhereNull('trail_id');
        return response.status(200).send({ trail, contents })
      } else {
        let contents = await Content.query().where('trail_id', id).orWhereNull('trail_id');

        let contentsUser = await ContentUser.query().where('user_id', user.id)

        contentsUser = contentsUser.filter((content) => (content.status === "finished" || content.favorite === true))

        return response.status(200).send({ trail, contents, contentsUser})
      }


    } catch (error) {
      console.log(error)
    }
  }

  public async getMyProgress({auth, response, request}: HttpContextContract){

    const { idTrail } = request.all()
    try {
      const user = await auth.authenticate()

      let userContents = await ContentUser.query().where('user_id', user.id)

      userContents = userContents.filter((user) => (user.status === "finished") && ((user.trail_id === idTrail) || user.trail_id === null))

      const contents = await Content.query().where('trail_id', idTrail).orWhere('trail_id', null)

      const progress = ((userContents.length / contents.length) * 100)

      return response.status(200).send({ progress })
    } catch (error) {
      console.log(error)
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
