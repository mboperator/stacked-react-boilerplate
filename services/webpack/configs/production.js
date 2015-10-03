var webpack = require('webpack');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = function production() {
  return {
    entry: {
      vendor: ['react', 'react-router','ramda','lodash', 'immutable'],
    },
    output: {
      path: './build',
      filename: '[name].[chunkhash].js',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __NODE_ENV__: JSON.stringify(env),
        __BASE_URL__:'/2/project'
      }),
    ],
  };
};
