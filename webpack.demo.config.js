var webpack = require("webpack"),
    path = require("path"),
    AssetsPlugin = require('assets-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var chunkhash = 'chunkhash';

var config = {
    entry: {
        button: './components/button/demo/index.js',
        vendor: [
            'jquery',
            'react-dom',
            'classnames'
        ]
    },
    output: {
        path: 'dist',
        filename: '[name].[' + chunkhash + '].js',
        chunkFilename: '[name].[' + chunkhash + '].js'
    },
    module: {
        noParse: ['jquery'],
        loaders: [
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
              test: /\.(jsx|js)?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties']
              }
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['url?limit=10000&name=image/[hash:8].[name].[ext]']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[' + chunkhash + '].js',
            chunks: ['demo', 'vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'manifest.[' + chunkhash + '].js', //仅包含webpack运行时环境和映射表
            chunks: ['vendor']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './components/button/demo/index.template',
            filename: path.resolve(process.cwd(), 'components/button/demo/index.html'),
            inject: true, //允许插件修改哪些内容，包括head与body
            chunks:['button', 'vendor', 'manifest']
        }),
        new ExtractTextPlugin('[name].[' + chunkhash + '].css', {
            allChunks: false
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.ProgressPlugin(function handler(percentage, msg) {/* ... */})
        new AssetsPlugin({
            filename:'./webpack-assets.json',
            prettyPrint: true
        })
    ],
    devServer: {
        proxy: {
            '*.action': {
                target: 'http://localhost',
                bypass: function(req, res, proxyOptions) {
                    //处理jsp页面默认的action
                    if (req.headers.accept.indexOf('html') != -1) {
                        return 'app.html';
                    }
                }
            }
        }
    },
    devtool: 'source-map'
}

module.exports = config;
