// var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	},
	optimization: {
		minimizer: [new UglifyJSPlugin({
			uglifyOptions: {
				output: {
					comments: false //use it for removing comments like "/*! ... */"
				}
			}
		})]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: 'build/assets',
			to: 'assets'
		}]),
		new HTMLWebpackPlugin({
			template: 'build/index.html',
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			// inlineSource: '.(js|css)$' // embed all javascript and css inline
		}),
		// new HtmlWebpackInlineSourcePlugin()
	]

};
