// These are currently set in webpack.config.js. They need to be set here
// because running tests does not go through webpack at all. In the future,
// these should be injected.
global.__NODE_ENV__ = JSON.stringify(process.env.NODE_ENV);
global.__BASE_URL__ = '/2/project';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);
chai.config.truncateThreshold = 0;
