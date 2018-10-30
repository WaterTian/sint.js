const webpack = require('webpack');
const path = require('path');
const ip = require('ip').address();

const libraryName = 'sint';



module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		path: __dirname + "/build",
		filename: libraryName + '.min.js',
		library: libraryName,
	},

	optimization: {
		minimize: true
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
		open: true, // 自动开启浏览器
	}


};