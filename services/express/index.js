import { curry } from 'ramda';
import express, { Router } from 'express';
import gatherFixtures from './utils/gatherFixtures';
import jsonServer from 'json-server';
import path from 'path';

const app = express();

export default curry((fixturesDirectory, port, webpackPort, host) => {
  gatherFixtures(fixturesDirectory)
    .then( fixtures => {

    const mockApi = jsonServer.router(fixtures);

    app.use(express.static('public'));

    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'jade');

    app.use('/api/mock', mockApi);
    app.get('/widgets', (req, res) => res.render('widgets', {host, port, webpackPort}));
    app.get('/widgets/*', (req, res) => res.render('widgets', {host, port, webpackPort}));
    app.get('/*', (req, res) => res.render('index', {host, port, webpackPort}));

    app.listen(port, host);

    console.info('==> Express server listening on %s', host + ':' + port);

    return host;

  })
  .fail(err => {
    throw new Error(err);
  });

});
