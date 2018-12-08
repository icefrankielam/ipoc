const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.common')
const { packages } = require('./src/config')

const IPOC_GATEWAY_URL = process.env.IPOC_GATEWAY_URL || 'http://0.0.0.0:8000'

const config = {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://0.0.0.0:8080/',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/index.js'),
    ],
  },
  output: common.output,
  module: {
    rules: common.rules,
  },
  plugins: common.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
  resolve: common.resolve,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 8080,
    public: 'localhost',
    hot: true,
    proxy: {
      '/api': `${IPOC_GATEWAY_URL}`,
      '/graphql': `${IPOC_GATEWAY_URL}`,
      '/static': `${IPOC_GATEWAY_URL}`,
      '/socket.io': `${IPOC_GATEWAY_URL}`,
    },
  },
  devtool: 'inline-source-map',
}


module.exports = config
