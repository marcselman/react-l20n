var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./client'
	],
	node: {
		fs: 'empty'
	},
	output: {
		path: path.resolve(__dirname, './builds'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.ftl?$/,
				loader: 'raw-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};