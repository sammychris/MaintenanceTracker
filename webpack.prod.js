/* eslint-disable */
const MinifyCssPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UgligyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge( common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
          new UgligyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
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
        use: [MinifyCssPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MinifyCssPlugin({
      filename: '[style].[hash].css',
      chunkFilename: '[id].[hash].css',
    })
  ],
});
