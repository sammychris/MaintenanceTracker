/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";


function htmlFile( name, sourceName ) {
	console.log(sourceName);
	return new HtmlWebpackPlugin({ filename : name, template: sourceName});
}


//htmlFile({filename: "contents/users.html", template: "./UI/contents/users.html" });

module.exports = {
  entry: "./client/app.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
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
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    // User
    new HtmlWebpackPlugin({template: './UI/index.html'}),
    htmlFile('contents/modify-request.html', './UI/contents/modify-request.html'),
    htmlFile('contents/sign-up.html', './UI/contents/sign-up.html'),
    htmlFile('contents/users-requests.html', './UI/contents/users-requests.html'),
    htmlFile('contents/users.html', './UI/contents/users.html'),
    // Admin
    htmlFile('admin/admin-dashboard.html', './UI/admin/admin-dashboard.html'),
    htmlFile('admin/admin-requests.html', './UI/admin/admin-requests.html'),
    htmlFile('admin/index.html', './UI/admin/index.html')

  ]
};
