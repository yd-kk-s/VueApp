const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './src/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, '../app/assets/javascripts'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.(scss|css)/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    sourceMap: true,
                    importLoaders: 2
                },
            },
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new ExtractTextPlugin("style.css")
  ]
};
