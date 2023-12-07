import Joi from 'joi'
import environments from '../constants/environments.js'

const { DEVELOPMENT, TEST, PRODUCTION } = environments

const schema = Joi.object().keys({
  port: Joi.number().default(3001),
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  serviceName: Joi.string().default('Farming Front Door'),
  routePrefix: Joi.string().default('/landing-page'),
  authHost: Joi.string().required(),
  gatewayHost: Joi.string().required()
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  serviceName: process.env.SERVICE_NAME,
  routePrefix: process.env.ROUTE_PREFIX,
  authHost: process.env.AUTH_HOST,
  gatewayHost: process.env.GATEWAY_HOST
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === DEVELOPMENT

export default value
