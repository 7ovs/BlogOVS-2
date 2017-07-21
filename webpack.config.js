var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "app.css", 
    allChunks: true
});

module.exports = {
  entry: {
    app: './app/scripts/app.jsx',
    style: './app/styles/app.sass'
  },
  output: {
    filename: '[name].js', 
    publicPath: "/app/public",
    path: path.resolve(__dirname, 'app/public')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html']
  },
  watch: true,
  plugins: [
    extractSass
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, //Check for all js files
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-0'] }
        }]
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: extractSass.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "sass-loader",
                  options: {
                    includePaths: [path.resolve(__dirname, "node_modules/uikit/src/scss")]
                  }
              }],
              // use style-loader in development
              fallback: "style-loader"
          })
      },
      { 
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
}