/* eslint-disable */
const webpack = require('webpack');
const MinifyCssPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge( common, {
	mode: 'development',
	devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    proxy: {
      "/": "http://localhost:8000"
    }
  },
  plugins: [
    new MinifyCssPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
});
