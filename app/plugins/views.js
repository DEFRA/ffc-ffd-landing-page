import path from 'path'
import { fileURLToPath } from 'url'
import nunjucks from 'nunjucks'
import Vision from '@hapi/vision'
import { serverConfig } from '../config/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const plugin = {
  plugin: Vision,
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), ...options.path),
            'app/views',
            'node_modules/govuk-frontend/'
          ], {
            autoescape: true,
            watch: serverConfig.isDev
          })

          return next()
        }
      }
    },
    path: ['../views'],
    relativeTo: __dirname,
    isCached: !serverConfig.isDev,
    context: {
      serviceName: serverConfig.serviceName,
      pageTitle: `${serverConfig.serviceName} - GOV.UK`
    }
  }
}

export default plugin
