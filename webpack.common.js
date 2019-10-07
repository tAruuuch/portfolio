const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './build'),
};

const PAGES_DIR = `${PATHS.src}/pug/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
	externals: {
    paths: PATHS
  },
	entry: {
		app: PATHS.src + '/js/app.js',
	},
	output: {
		path: PATHS.build,
		// publicPath: '/',
		filename: `[name].min.js`,
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: 4,
			})
		],
	},
	module: {
		rules: [{
			test: /\.pug$/,
			loader: 'pug-loader'
		}, {
			test: /\.js$/,
			exclude: '/node_modules/',
			use: { loader: 'babel-loader' }
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.(sa|sc|c)ss$/,
			exclude: '/node_modules/',
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: process.env.NODE_ENV === 'development',
					}
				}, {
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						config: {
							path: './postcss.config.js'
						}
					}
				}, {
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new MiniCssExtractPlugin({
			filename: `[name].min.css`
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/img`, to: `${PATHS.build}/img` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.build}/fonts` },
      { from: `${PATHS.src}/static`, to: '' },
		]),
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/,'.html')}`
		})),
	],
};