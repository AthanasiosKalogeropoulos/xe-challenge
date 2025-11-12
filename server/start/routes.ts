/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const AreasController = () => import('#controllers/areas_controller')
const AdsController = () => import('#controllers/ads_controller')

router.post('/api/login', [AuthController, 'login'])
router.get('/api/areas', [AreasController, 'search'])

router
  .group(() => {
    router.get('/api/me', [AuthController, 'me'])
    router.get('/api/ads', [AdsController, 'index'])
    router.post('/api/ads', [AdsController, 'create'])
    router.put('/api/ads/:id', [AdsController, 'update'])
    router.delete('/api/ads/:id', [AdsController, 'destroy'])
  })
  .use([
    middleware.auth({
      guards: ['api'],
    }),
  ])
