import healthy from '../routes/healthy.js'
import healthz from '../routes/healthz.js'
import assets from '../routes/assets.js'
import index from '../routes/index.js'
import home from '../routes/home.js'

const routes = [].concat(
  healthy,
  healthz,
  assets,
  index,
  home
)

const plugin = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}

export default plugin
