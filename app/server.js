import Hapi from '@hapi/hapi'
import Joi from 'joi'
import Inert from '@hapi/inert'
import Blipp from 'blipp'
import * as HapiAuthJwt2 from 'hapi-auth-jwt2'
import { serverConfig } from './config/index.js'
import views from './plugins/views.js'
import auth from './plugins/auth.js'
import router from './plugins/router.js'
import errors from './plugins/errors.js'
import crumb from './plugins/crumb.js'
import logging from './plugins/logging.js'

const createServer = async () => {
  const server = Hapi.server({
    port: serverConfig.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  server.validator(Joi)
  await server.register(Inert)
  await server.register(HapiAuthJwt2)
  await server.register(views)
  await server.register(auth)
  await server.register(router, { routes: { prefix: serverConfig.routePrefix } })
  await server.register(errors)
  await server.register(crumb)
  await server.register(logging)
  if (serverConfig.isDev) {
    await server.register(Blipp)
  }

  return server
}

export { createServer }
