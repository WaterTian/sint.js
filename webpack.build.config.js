const webpack = require('webpack');
const path = require('path');


module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: './src/sint.js',
	output: {
		path: __dirname + "/build",
		filename: 'sint.js',
		library: 'Sint',
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
	}


};