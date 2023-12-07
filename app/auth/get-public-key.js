import Wreck from '@hapi/wreck'
import { serverConfig } from '../config/index.js'

const getPublicKey = async () => {
  const { payload } = await Wreck.get(`${serverConfig.authHost}/auth/public-key`, { json: true })
  return payload
}

export { getPublicKey }
