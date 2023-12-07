import scopes from './scopes.js'
import { isInRole } from './is-in-role.js'

const { USER } = scopes

const mapAuth = (request) => {
  return {
    isAuthenticated: request.auth.isAuthenticated,
    isAnonymous: !request.auth.isAuthenticated,
    isUser: request.auth.isAuthenticated && isInRole(request.auth.credentials, USER),
    credentials: request.auth.credentials
  }
}

export { mapAuth }
