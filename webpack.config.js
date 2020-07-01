const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './client/src/js/index.jsx'
  },
  output: {
    path: __dirname + '/dist/client',
    publicPath: '/',
    filename: 'static/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /(\.s?css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'client/public/index.html' })
  ],
  devServer: {
    port: 9000,
    inline: true,
    historyApiFallback: true,
    open: true,
    contentBase: './dist/client'
  }
};
