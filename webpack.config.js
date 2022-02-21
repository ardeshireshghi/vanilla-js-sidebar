const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: './examples/src/example.js',
  output: {
    path: __dirname + '/examples/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /(sidebar|Sidebar|react-example).js/,
        use: { loader: 'umd-compat-loader' }
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, '/examples/dist')
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
};
