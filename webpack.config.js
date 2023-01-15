'use strict';

const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('./babel.config');

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './index.js',
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new ESLintWebpackPlugin(),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, 'docs'),
          },
        ],
      }),
      new HTMLWebpackPlugin({
        template: './index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
      ],
    },
  };
};
