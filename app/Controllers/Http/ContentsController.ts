import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import Trail from 'App/Models/Trail';

export default class ContentsController {
  public async index({ response }: HttpContextContract) {

    try {
      const contents = await Content.all();

      return response.status(200).send(contents)
    }catch(error){
      console.log(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const { title, type, duration, link, author, category, idTrail } = request.all()

    try {

      const trail = await Trail.findOrFail(idTrail)
      if(
        category === 'initial' && idTrail !== null 
      ) return response.status(400).send({ message: 'Operação Inválida' })
      
      const newContent = await Content.create({
        title,
        type,
        duration,
        link,
        author,
        category
      })

      if (trail) {
        await newContent.related('trail').associate(trail)
      }

      return response.status(201).send(newContent)
    } catch (error) {
      console.log(error)
    }
  }

  public async show({params, response}: HttpContextContract) {
    const { id } = params

    try {
      const content = await Content.findOrFail(id)

      return response.status(200).send(content)
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, response, params}: HttpContextContract) {
    const { id } = params

    const newContent = request.only(['title', 'type', 'duration', 'link', 'author', 'category'])

    try {
      const content = await Content.findOrFail(id)

      content.merge(newContent)

      await content.save()

      return response.status(200).send(content)
    } catch (error) {
      console.log(error)
    }

  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    try {
      const content = await Content.findOrFail(id)

      await content.delete()

      return response.status(200).send({ message: `Content ${id} deleted` })
    } catch (error) {
      console.log(error)
    }
  }

  public async filterContents({ response, request }: HttpContextContract) {

    try {
      const query = request.only(['id_trail', 'category'])

      const contents = await Content.query().where('trail_id', query.id_trail).andWhere('category', query.category)

      return response.status(200).send(contents)
    } catch (error) {
      return response.status(500).send(error)
    }
  }
  public async getInitialContents({ response }: HttpContextContract)  {
    try{
      const initialContents = await Content.query().where('category', 'initial')
      return response.status(200).send(initialContents)

    }catch (error){
      console.log(error)
    }
  }
}
