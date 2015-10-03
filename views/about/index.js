export default {

  path: 'about',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./handler'));
    });
  },

  getIndexRoute(location, cb) {
    require.ensure([], require => cb(null, require('./views/home')));
  },

};
