export default {

  path: 'gallery',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./handler'));
    });
  },

  getIndexRoute(location, cb) {
    require.ensure([], require => cb(null, require('./views/home')));
  },

};
