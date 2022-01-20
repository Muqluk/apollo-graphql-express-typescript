/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const isDev = ['development', 'test', 'staging'].includes(env);
const isProd = !isDev;
const dist = path.join(__dirname, 'dist');
const filterUndefined = (p) => p === undefined;

module.exports = {
  entry: './src/index.ts',
  mode: isDev ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  stats: 'verbose',
  externals: [nodeExternals()],
  plugins: [
    isProd && new CleanWebpackPlugin({}),
    isDev && new webpack.HotModuleReplacementPlugin({}),
  ].filter(filterUndefined),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [{
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.ts$/,
      use: [
        'ts-loader',
      ]
    }
    ]
  }
};
