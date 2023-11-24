const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getStrategy = async () => {
  const { payload } = await Wreck.get(`${serverConfig.privateGatewayHost}/auth/strategy`, { json: true })
  return payload
}

module.exports = {
  getStrategy
}
