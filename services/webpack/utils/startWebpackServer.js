import { curry } from 'ramda';
import webpack from 'webpack';
import config from '../configs/bootstrap';
import DevServer from 'webpack-dev-server';

function getContentBase(host, port){
  return `http://${host}:${port}`;
}

export default curry((env, port, host, app) => {

  const compiler = webpack(config(env, port, host));
  const contentBase = getContentBase(host, port);

  /** Configure webpack server **/
  const server = new DevServer(compiler, {
    contentBase,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 20,
    },
    publicPath: `${contentBase}/build`,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: { colors: true },
  });


  /** Start webpack server **/
  server.listen(port, host, ()=> console.info('==> Webpack development server listening on port %s', contentBase));

  app && app(port, host);
});
