import verbs from '../constants/http-verbs.js'

const { GET } = verbs

const route = {
  method: GET,
  path: '/assets/{path*}',
  options: {
    auth: false,
    handler: {
      directory: {
        path: [
          'app/dist',
          'node_modules/govuk-frontend/govuk/assets'
        ]
      }
    },
    cache: {
      expiresIn: 60000,
      privacy: 'private'
    }
  }
}

export default route
