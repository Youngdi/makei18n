const webpack = require('webpack');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/zip.js'],
	output: {
		filename: './js/webMakei18n.min.js',
		path: path.resolve(__dirname, 'dist')
	},
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new UglifyJSPlugin({
      cache: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new Visualizer({
      filename: './statistics.html',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  // devtool: 'source-map',
};
