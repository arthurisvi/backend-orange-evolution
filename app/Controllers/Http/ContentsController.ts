import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class ContentsController {
  public async index({ response }: HttpContextContract) {
    
    try {
      const contents = await Content.all();

      return response.status(200).send(contents)
    }catch(error){
      console.log(error)
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { title, type, duration, link, author, category } = request.all()

    try {

      const newContent = await Content.create({
        title, 
        type,
        duration,
        link,
        author,
        category
      })
      
      return response.status(201).send(newContent)
    } catch (error) {
      console.log(error)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
