const webpack = require('webpack')
const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.common')


const productionConfig = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  output: common.output,
  module: {
    rules: common.rules.concat([
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ]),
  },
  plugins: common.plugins.concat([
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]),
  resolve: common.resolve,
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'nosources-source-map',
}

module.exports = productionConfig
