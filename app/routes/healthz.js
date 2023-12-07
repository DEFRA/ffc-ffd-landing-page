import verbs from '../constants/http-verbs.js'
import ok from '../constants/ok.js'

const { GET } = verbs
const { OK } = ok

const route = {
  method: GET,
  path: '/healthz',
  options: {
    auth: false
  },
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}

export default route
