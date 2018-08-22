/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";


function htmlFile( name, sourceName = './UI/index.html' ) {
	console.log(sourceName);
	return new HtmlWebpackPlugin({ filename : name, template: sourceName});
}


//htmlFile({filename: "contents/users.html", template: "./UI/contents/users.html" });

module.exports = {
  entry: "./UI/js/app.js",
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
    htmlFile('index'),
    htmlFile('contents/user','./UI/contents/users.html'),
    htmlFile('contents/user-requests','./UI/contents/users.html'),
    htmlFile('contents/sign-up','./UI/contents/users.html'),
    htmlFile('contents/modify-request','./UI/contents/users.html'),
    htmlFile('admin/index','./UI/admin/index.html'),
    htmlFile('admin/admin-requests','./UI/contents/users.html'),
    htmlFile('admin/admin-dashboard','./UI/contents/users.html')
  ]
};
