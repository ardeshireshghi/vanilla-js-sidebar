const path = require('path');
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
                test: /sidebar.js/,
                 use: { loader: 'umd-compat-loader' }
            }
        ],
    },
  devServer: {
    static: path.join(__dirname, '/examples/dist')
  }
};
