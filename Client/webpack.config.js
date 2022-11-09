const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = false;
const _dirname = path.dirname(__filename);

module.exports = {
  entry: {
    'students' : path.resolve(_dirname, './src/scripts/students.js'),
    'groups' : path.resolve(_dirname, './src/scripts/groups.js'),
  },

  output: {
    path: path.resolve(_dirname, '../Serveur/public'),
    filename: 'scripts/[name].js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, 'dist'),
	       watch : true
      },
      host: 'localhost',
      port : 8888,
      open : 'firefox'
  },

  module: {
    rules : [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/students.html",
      filename: "./students.html",
      chunks: ['students']
    }),
    new HtmlWebpackPlugin({
      template: "./src/groups.html",
      filename: "./groups.html",
      chunks: ['groups']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/index.html',
          to:  'index.html',
          noErrorOnMissing: true
        },
        {
          from: './src/images/*',
          to:  'images/[name].[ext]',
          noErrorOnMissing: true
        },
        {
          from: './src/style/*',
          to:  'style/[name].[ext]',
          noErrorOnMissing: true
        },
      ]
    })
  ]

};
