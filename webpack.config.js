const webpack = require('webpack');
const path = require('path');
const ip = require('ip').address();

const libraryName = 'sint';



module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: __dirname + "/build",
		filename: libraryName + '.min.js',
		library: libraryName,
	},

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
		open: false, // 自动开启浏览器
	}


};