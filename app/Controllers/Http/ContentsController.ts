import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import ContentUser from 'App/Models/ContentUser';
import Trail from 'App/Models/Trail';

export default class ContentsController {
  public async index({ response }: HttpContextContract) {

    try {
      const contents = await Content.all();

      return response.status(200).send(contents)
    } catch (error) {
      console.log(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const { title, type, duration, link, author, category, idTrail } = request.all()

    try {

      const trail = await Trail.find(idTrail)
      if (
        category === 'initial' && idTrail !== null
      ) return response.status(400).send({ message: 'Não é possível atribuir um conteúdo inicial a uma trilha! O conteúdo inicial é comum a todas as trilhas.' })

      const newContent = await Content.create({
        title,
        type,
        duration,
        link,
        author,
        category,
        trail_id: idTrail
      })

      if (trail) {
        await newContent.related('trail').associate(trail)
      }

      return response.status(201).send(newContent)
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const content = await Content.findOrFail(id)

      return response.status(200).send(content)
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
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
  public async getInitialContents({ response }: HttpContextContract) {
    try {
      const initialContents = await Content.query().where('category', 'initial')
      return response.status(200).send(initialContents)

    } catch (error) {
      console.log(error)
    }
  }

  public async isFavorited({ auth, response, request }: HttpContextContract) {

    try {

      const user = await auth.authenticate()

      const idContent = request.only(['id'])

      const userContent = await ContentUser.query().where('user_id', user.id).andWhere('content_id', idContent).first()

      if (userContent && userContent.favorite) {
        console.log('é favorito')
        return response.status(200).send({ isFavorited: true })
      } else {
        console.log('nao é favorito')
        return response.status(200).send({ isFavorited: false })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
