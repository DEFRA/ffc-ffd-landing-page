import Wreck from '@hapi/wreck'
import { serverConfig } from '../config/index.js'

const validateToken = async (decoded, _request, _h) => {
  const { payload } = await Wreck.post(`${serverConfig.authHost}/auth/validate`, {
    payload: {
      token: decoded
    },
    json: true
  })
  return payload
}

export { validateToken }
