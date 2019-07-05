/* eslint-disable */
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UgligyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDirectory = "dist";
const generateHTML = ( name, sourceName ) => new HtmlWebpackPlugin({ filename : name, template: sourceName });




module.exports = {
  // entry: "./client/app.js",
  entry: "./client/index.js",
   plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    // User
    // new HtmlWebpackPlugin({template: './UI/index.html'}),
    // generateHTML('contents/modify-request.html', './UI/contents/modify-request.html'),
    // generateHTML('contents/sign-up.html', './UI/contents/sign-up.html'),
    // generateHTML('contents/users-requests.html', './UI/contents/users-requests.html'),
    // generateHTML('contents/users.html', './UI/contents/users.html'),
    // // Admin
    // generateHTML('admin/dashboard.html', './UI/admin/dashboard.html'),
    // generateHTML('admin/requests.html', './UI/admin/requests.html'),
    // generateHTML('admin/index.html', './UI/admin/index.html'),

    new HtmlWebpackPlugin({template: './public/index.html'}),

    // new CopyWebpackPlugin([
    // { from: 'client/img/',
    //   to: 'img',
    //   toType: 'dir'
    // }
    // ], { copyUnmodified: true })
  ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "js/bundle.js"
  }
};
