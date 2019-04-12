var path = require('path');
var webpack = require('webpack');

module.exports = {
	mode: 'development',
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
		rules: [
			{
				test: /\.ftl?$/,
				use: 'raw-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				include: /fluent/
			}
		]
	}
};