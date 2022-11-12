import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content';
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

  public async getContents({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const trail = await Trail.findOrFail(id);

      const contents = await Content.query().where('trail_id', id).orWhereNull('trail_id');

      return response.status(200).send({ trail, contents })
    } catch (error) {
      console.log(error)
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
