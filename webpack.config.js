const environment = 'development';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './web/src/index.js',
  mode : environment,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "web/src/", "notes"),
      ],
      options: {
        concurrency: 100,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      settings: path.resolve(__dirname, 'config/'),
      'org.ranapat.grpc.examples': path.resolve(__dirname, './'),
      'css': path.resolve(__dirname, 'src/css'),
    },
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, './data'),
        publicPath: '/data'
      }
    ],
  },
};
