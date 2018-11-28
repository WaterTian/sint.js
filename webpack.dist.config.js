const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const package = require('./package.json');


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/sint.js',
    output: {
        path: __dirname + "/dist",
        filename: 'sint.min.js',
        library: 'Sint',
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '@sint.js'+' \n'+'version:' +package.version+ ' \n'+'author:' +package.author,
            entryOnly: true
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: true,
                extractComments:false,
                uglifyOptions: {
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    warnings: false,
					output: {
						comments: /@sint.js/i
					}
                }
            })
        ]
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/
        }, {
            test: /\.(glsl|frag|vert)$/,
            loader: 'raw-loader',
            exclude: /node_modules/
        }, {
            test: /\.(glsl|frag|vert)$/,
            loader: 'glslify-loader',
            exclude: /node_modules/
        }, ]
    }


};