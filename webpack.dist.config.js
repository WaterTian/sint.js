const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
	mode: 'production',
	devtool: 'source-map',
	context: __dirname + '/src/',
	entry: {
		sint: './sint.js',
		'sint.min': './sint.js'
	},

	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		library: 'Sint',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},

	performance: {
		hints: false
	},

	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				include: /\.min\.js$/,
				parallel: true,
				sourceMap: false,
				uglifyOptions: {
					compress: true,
					ie8: false,
					ecma: 5,
					output: {
						comments: false
					},
					warnings: false
				},
				warningsFilter: () => false
			})
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['dist'])
	]

};