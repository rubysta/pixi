var InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var path = require('path');

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: 'dist',
		port: 3000,
		// publicPath: '/dist',
		open: true
	},
	devtool: 'inline-source-map',

	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js',
		// publicPath: publicUrl + '/',
	},
 	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				// cache: true,
				parallel: true,
				terserOptions: {
					ecma: 10, // обратите внимание, что это последняя версия стандарта!
					compress: true,
					output: {
						comments: false,
						beautify: false
					}
				}
			})
		]
	},
		// minimizer: [new UglifyJSPlugin({
		// 	uglifyOptions: {
		// 		output: {
		// 			comments: false //use it for removing comments like "/*! ... */"
		// 		}
		// 	}
		// })]
	plugins: [
		new CleanWebpackPlugin(),
		// new CopyWebpackPlugin( {
		// 	patterns: [
		// 		{
		// 			from: 'build/assets/images', to: 'images'
		// 		},
		// 		{
		// 			from: 'build/assets/sounds', to: 'sounds'
		// 		}
		// 	]
		// }),
		new HtmlWebpackPlugin({
			title: "",
			// template: 'build/index.html',
			filename: 'index.html',
			inject: true,
			inlineSource: '.(js|css)$' // embed all javascript and css inline
		}),
		new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
		new ScriptExtHtmlWebpackPlugin({
			inline: [/\.js$/],
		})
	]

};
