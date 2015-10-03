var webpack = require('webpack');


module.exports = function development(env, webpackPort, host) {

  var url = function baseUrl() {
    return 'http://' + host + ':' + webpackPort;
  }();

  return {
    entry: {
      app: [
        'webpack-dev-server/client?' + url,
        'webpack/hot/dev-server',
        './app.js'
      ],
      bundle: [
        'webpack-dev-server/client?' + url,
        'webpack/hot/dev-server',
        './bundle.js'
      ],
    },

    output: {
      path: '/build',
      filename: '[name].hot.js',
      publicPath: url + '/build',
    },

    module: {
      loaders: [
        {
          test: [/\.js$/, /\.jsx$/],
          loaders: ['react-hot', 'babel?stage=0&plugins[]=typecheck'],
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __NODE_ENV__: JSON.stringify(env),
        __BASE_URL__:'/2/project'
      }),
    ],

    debug: true,

    devtool: 'eval-source-map',
  };

};

