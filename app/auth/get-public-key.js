const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getPublicKey = async () => {
  const { payload } = await Wreck.get(`${serverConfig.privateGatewayHost}/auth/public-key`, { json: true })
  return payload
}

module.exports = {
  getPublicKey
}
