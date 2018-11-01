const webpack = require('webpack');
const path = require('path');
const ip = require('ip').address();



module.exports = {
	mode: 'development',
	context: __dirname + '/src/',
    entry: {
        sint: './sint.js'
    },
	output: {
		path: __dirname + "/build",
		filename: '[name].js',
		library: 'Sint',
	},

	performance: { hints: false },

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		rules: [{
			test: /\.js$/,
	        loader: 'babel-loader',
	        include: [path.resolve(__dirname, 'src')],
			exclude: /node_modules/
		}, ]
	},

	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		host: ip,
		port: "8088",
		open: true, // 自动开启浏览器
	}


};