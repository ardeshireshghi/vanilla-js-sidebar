const path = require('path');
module.exports = {
  mode: 'none',
  entry: './examples/src/example.js',
  output: {
    path: __dirname + '/examples/dist',
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, '/examples/dist')
  }
};
