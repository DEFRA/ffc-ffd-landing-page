const { GET } = require('../constants/http-verbs')

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    tags: ['graphql'],
    handler: (request, h) => {
      return h.response({Business.id}).code(200)
    }
  }
}
