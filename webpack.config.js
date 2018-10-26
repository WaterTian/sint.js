const webpack = require('webpack');
const path = require('path');
const libraryName = 'sint';



module.exports = {
	// devtool: 'source-map',
	entry: './src/index.js',
	output: {
		path: __dirname + "/build",
		filename: libraryName + '.js',
		library: libraryName,
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		rules: [{
			test: /\.js$/,
			use: ["babel-loader"],
			exclude: "/node_modules/"
		}, ]
	},

	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		host: 'localhost',
		port: "8090",
		open: false, // 自动开启浏览器
	}


};