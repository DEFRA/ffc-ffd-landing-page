const { getStrategy, validateToken } = require('../auth')

module.exports = {
  plugin: {
    name: 'auth',
    register: async (server, _options) => {
      const strategy = await getStrategy()

      server.auth.strategy('jwt', 'jwt', {
        ...strategy,
        validate: validateToken
      })
      server.auth.default({ strategy: 'jwt', mode: 'try' })
    }
  }
}
