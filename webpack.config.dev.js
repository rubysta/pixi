var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
		filename: 'index_bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: 'build/assets/images', to: 'images'
				},
				{
					from: 'build/assets/sounds', to: 'sounds'
				}
			]
		}),
		new HtmlWebpackPlugin({
			template: 'build/index.html',
			filename: 'index.html'
		}),
	]

};
