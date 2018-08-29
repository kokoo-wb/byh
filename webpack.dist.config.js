'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var autoprefixer = require('autoprefixer')
var precss = require('precss')
var pxtorem = require('postcss-pxtorem')

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.resolve(__dirname, 'src/statics/svg'), // 1. 属于 antd-mobile 内置 svg 文件
]

module.exports = {
    entry: {
        main: ['babel-polyfill', './src/index.jsx'],
        // vendors: ['react', 'react-dom', 'react-router', 'echarts']
    },
    output: {
        path: path.join(__dirname, 'dist/src'),
        filename: '[name].[hash].js',
        publicPath: '/src/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false,
            },
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('css/style.[hash].css'),
        // 根据模板插入css/js等生成最终`html`
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'dist/') + 'index.html', // 生成的html存放路径，相对于`path`
            template: 'src/index-tpl.html', // html模板路径
            inject: true, // 允许插件修改哪些内容，包括head与body
            hash: true, // 为静态资源生成hash值
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    resolve: {
        extensions: ['', '.web.js', '.js', '.json', '.jsx', '.less'],
        alias: {
            appRoot: path.join(__dirname, 'src'),
            component: path.join(__dirname, 'src/components'),
            static: path.join(__dirname, 'src/statics'),
        }
    },
    module: {
        loaders: [{
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?parser=postcss-less!less-loader', { publicPath: '../' }),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', { publicPath: '../' }),
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[name].[ext]',
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'src'),
                ],
                loaders: [
                    'babel?presets[]=react,presets[]=es2015,presets[]=stage-2',
                ],
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
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