const Wreck = require('@hapi/wreck')
const { GET } = require('../constants/http-verbs')
const { USER } = require('ffc-auth/scopes')

module.exports = [{
  method: GET,
  path: '/home',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    const defraIdToken = request.state.ffc_ffd_auth_token
    const crn = request.auth.credentials.crn
    const { payload } = await Wreck.post('http://ffc-ffd-data:3004', {
      headers: {
        crn,
        Authorization: defraIdToken
      },
      json: true
    })
    console.log(payload)
    return h.view('home')
  }
}]
