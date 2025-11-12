import { HttpContext } from '@adonisjs/core/http'
import { createValidator, updateValidator } from '#validators/ad'
import Ad from '#models/ad'

export default class AdsController {
  // Επιστροφή όλων των αγγελιών
  public async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const ads = await Ad.query().where('user_id', user.id).orderBy('id', 'desc')
    return response.json(ads)
  }

  // create
  public async create({ auth, request, response }: HttpContext) {
    await request.validateUsing(createValidator)
    const user = auth.user!
    const data = request.only([
      'title',
      'description',
      'price',
      'place_id',
      'place_main_text',
      'place_secondary_text',
    ])

    if (!data.title || !data.place_id) {
      return response.status(400).json({ error: 'title and place_id are required' })
    }

    const ad = await Ad.create({ ...data, user_id: user.id })
    return response.status(201).json(ad)
  }

  // update
  public async update({ auth, params, request, response }: HttpContext) {
    await request.validateUsing(updateValidator)
    const ad = await Ad.query().where('id', params.id).where('user_id', auth.user!.id).first()
    if (!ad) return response.status(404).json({ error: 'Not found' })

    const data = request.only(['title', 'description', 'price'])
    ad.merge(data)
    await ad.save()
    return response.json(ad)
  }

  // delete
  public async destroy({ auth, params, response }: HttpContext) {
    const ad = await Ad.query().where('id', params.id).where('user_id', auth.user!.id).first()
    if (!ad) return response.status(404).json({ error: 'Not found' })

    await ad.delete()
    return response.json({ success: true })
  }
}
