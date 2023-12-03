import path from 'path'
import { fileURLToPath } from 'url'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import environments from './app/constants/environments.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { DEVELOPMENT, PRODUCTION, TEST } = environments
const routePrefix = process.env.ROUTE_PREFIX || '/landing-page'
const isDev = process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST

console.log(`Running webpack in ${isDev ? DEVELOPMENT : PRODUCTION} mode`)

export default {
  entry: {
    core: [
      './app/frontend/css/index.js'
    ]
  },
  mode: isDev ? DEVELOPMENT : PRODUCTION,
  module: {
    rules: [
      {
        test: /\.(?:s[ac]|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: false
            }
          },
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[fullhash].[ext]'
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[fullhash].js',
    path: path.resolve(__dirname, 'app/dist'),
    publicPath: `${routePrefix}/assets/`,
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../views/_layout.njk',
      template: 'app/views/_layout.template.njk',
      chunks: ['core'],
      metadata: {
        routePrefix
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css'
    })
  ]
}
