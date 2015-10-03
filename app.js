import React from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const Home = require('./app/views/home');
const About = require('./app/views/about');

const rootRoute = {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      component: require('./app/handler'),
      childRoutes: [
        Home,
        About,
      ],
      indexRoute: Home,
    },
  ],
};

const routes = (
  <Router history={createBrowserHistory()} routes={rootRoute}/>
);


document.addEventListener('DOMContentLoaded', () => {
  React.render(
    routes,
    document.getElementById('root')
  );
});
