const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve('public')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  watchOptions: {
    ignored: '/node_modules/',
    aggregateTimeout: 300,
    poll: 1000
  },
  mode: 'development'
}