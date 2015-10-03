var webpack = require('webpack');
var Immutable = require('immutable');
var development = require('./development');
var production = require('./production');

module.exports = function(env, webpackPort, host){

  var isProduction = env === 'production';

  var EnvironmentConfig = Immutable.fromJS(isProduction ? production() : development(env, webpackPort, host));

  var Base = Immutable.fromJS({
    entry: {
      app: [
        './app.js',
      ],
    },

    module: {
      loaders: [
        {
          test: [/\.js$/, /\.jsx$/],
          loaders: ['babel?stage=0'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.sass$/,
          loader: 'style-loader!css-loader!sass-loader?indentedSyntax',
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
        },
      ],
    },

    resolve: {
      modulesDirectories: [
        '_shared',
        'node_modules',
        'redux',
      ],
      extensions: ['', '.js', '.jsx', '.json', '.css', '.sass'],
    },

    debug: true,

    node: {
      process: true,
    },

  });

  var FinalConfig = Base.mergeDeep(EnvironmentConfig);

  return FinalConfig.toJS();
}
