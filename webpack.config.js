const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: __dirname + '/deploy/dist',
    publicPath: '/dist',
  },

  //Enable sourcemaps for debugging webpack's output
  devtool: 'source-map',

  resolve: {
    //add '.ts' and '.tsx' as resolvable extensions
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      //all files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
      //all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['deploy']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.template.html',
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new CopyWebpackPlugin([
      {from: './node_modules/demo-mvvm-note-app/dist', to: '../editor'},
    ]),
  ],
  // when importing a module whose path matches one of the following, just assume a corresponding global variable exists and use that instead. This is important b/c it allows us to avoid bundling all of our dependencies, which allows browsers to cache those libraries between builds
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
