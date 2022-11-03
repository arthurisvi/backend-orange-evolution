import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
