const path = require('path');

module.exports = {
  entry: './src/lib/searchBox.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vt.lib.js',
    libraryTarget: 'module',
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  mode: 'production',
};
