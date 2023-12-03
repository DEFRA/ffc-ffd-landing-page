import verbs from '../constants/http-verbs.js'
import scopes from '../auth/scopes.js'

const { GET } = verbs
const { USER } = scopes

export default {
  method: GET,
  path: '/home',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (_request, h) => {
    return h.view('home')
  }
}
