import { getPublicKey, validateToken } from '../auth/index.js'
import algorithms from '../constants/algorithms.js'
import cookies from '../constants/cookies.js'

const { RS256 } = algorithms
const { AUTH_COOKIE_NAME } = cookies

const plugin = {
  plugin: {
    name: 'auth',
    register: async (server, _options) => {
      server.auth.strategy('jwt', 'jwt', {
        key: getPublicKey,
        cookieKey: AUTH_COOKIE_NAME,
        validate: validateToken,
        verifyOptions: { algorithms: [RS256] }
      })
      server.auth.default({ strategy: 'jwt', mode: 'try' })
    }
  }
}

export default plugin
