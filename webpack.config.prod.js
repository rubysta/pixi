// var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var path = require('path');

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: 'dist',
		port: 3000
	},
	devtool: 'inline-source-map',

	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	},
	optimization: {
		// minimize: true,
		// minimizer: [
		// 	new TerserPlugin({
		// 		cache: true,
		// 		parallel: true,
		// 		terserOptions: {
		// 			ecma: 10, // обратите внимание, что это последняя версия стандарта!
		// 			compress: true,
		// 			output: {
		// 				comments: false,
		// 				beautify: false
		// 			}
		// 		}
		// 	})
		// ]
		// minimizer: [new UglifyJSPlugin({
		// 	uglifyOptions: {
		// 		output: {
		// 			comments: false //use it for removing comments like "/*! ... */"
		// 		}
		// 	}
		// })]
	},
	plugins: [
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: 'build/assets/images', to: 'images'
				}
			]
		}),
		new HtmlWebpackPlugin({
			template: 'build/index.html',
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			// inlineSource: '.(js|css)$' // embed all javascript and css inline
		}),
		// new HtmlWebpackInlineSourcePlugin()
	]

};
