'use strict'

var path = require('path')
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
// import the plugin
var DashboardPlugin = require('webpack-dashboard/plugin')

var dashboard = new Dashboard()
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var pxtorem = require('postcss-pxtorem')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),
  path.resolve(__dirname, 'src/statics/svg')
]
console.log(__dirname)
module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 9600,
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.json', '.jsx', '.less'],
    alias: {
      appRoot: path.join(__dirname, 'src'),
      component: path.join(__dirname, 'src/components'),
      static: path.join(__dirname, 'src/statics'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader?modules&parser=postcss-less!less-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]',
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192&name=../font/[name].[ext]',
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: '> 5%'
    }),
    precss,
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    })
  ]
}