import { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

const cache = new Map<string, { ts: number; data: any }>()
const CACHE_TTL = 1000 * 60 * 5 // 5 λεπτά

export default class AreasController {
  public async search({ request, response }: HttpContext) {
    const input = request.qs().input?.toString() || ''

    if (!input || input.length < 3) {
      return response.status(400).json({ error: 'Input must be at least 3 characters' })
    }

    const key = input.toLowerCase().trim()
    const cached = cache.get(key)

    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return response.json(cached.data)
    }

    try {
      const resp = await axios.get(
        'https://oapaiqtgkr6wfbum252tswprwa0ausnb.lambda-url.eu-central-1.on.aws/',
        {
          params: { input },
        }
      )
      cache.set(key, { ts: Date.now(), data: resp.data })
      return response.json(resp.data)
    } catch (error) {
      console.error('Autocomplete API error:', error.message)
      return response.status(500).json({ error: 'Failed to fetch data' })
    }
  }
}
