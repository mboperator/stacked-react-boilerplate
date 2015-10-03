import * as resource from '../resource';
import reducer from '../resource';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS, Map } from 'immutable';

const {describe, it, before} = global;

describe('resource', () => {
  before(() => {
    chai.use(chaiImmutable);
    chai.config.truncateThreshold = 0;
  });

  describe('getConfig', () => {
    it('returns axios config', () => {
      expect(resource.getConfig()).to.eql({
        headers: {
          'X-CSRF-TOKEN': 'FIX ME',
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('fetchResource', () => {
    it('fetches a resource', () => {
      const request = {
        def: {
          get: name => name,
        },
      };

      expect(resource.fetchResource(request)).to.contain({
        meta: request,
        type: 'FETCH_RESOURCE',
      });
    });
  });

  describe('createResource', () => {
    it('creates a resource', () => {
      const request = {
        def: {
          get: name => {
            return { get: name => name };
          },
        },
        doc: { },
      };

      expect(resource.createResource(request)).to.contain({
        meta: request,
        type: 'CREATE_RESOURCE',
      });
    });
  });

  describe('patchResource', () => {
    it('patches a resource', () => {
      const request = {
        def: {
          get: () => {
            return { get: name => name };
          },
        },
        doc: { id: 42 },
      };

      expect(resource.patchResource(request)).to.contain({
        meta: request,
        type: 'PATCH_RESOURCE',
      });
    });
  });

  describe('destroyResource', () => {
    it('destroys a resouce', () => {
      const request = {
        def: {
          get: name => name,
        },
        id: 42,
      };

      expect(resource.destroyResource(request)).to.contain({
        meta: request,
        type: 'DESTROY_RESOURCE',
      });
    });
  });

  describe('reducer', () => {
    describe('FETCH_RESOURCE', () => {
      it('returns a new state that includes the payload', () => {
        const initialState = fromJS({
          session: {},
          collections: {},
        });

        const action = {
          payload: {
            data: [
              {
                id: 1,
                firstName: 'Mike',
                lastName: 'Stock',
              }
            ],
          },
          meta: {
            def: Map({
              name: 'users',
            }),
          }
        };

        const newState = fromJS({
          session: {
          },
          collections: {
            users: {
              '1': {
                id: 1,
                firstName: 'Mike',
                lastName: 'Stock',
              },
            },
          },
        });

        const { FETCH_RESOURCE } = reducer;
        expect(FETCH_RESOURCE(initialState, action)).to.equal(initialState);
      });
    });
    describe('CREATE_RESOURCE', () => {
      it('returns collection with object optimistically added', () => {
        const initialState = fromJS({
          session: {},
          collections: {},
        });

        const action = {
          payload: {
            def: Map({
              name: 'users',
            }),
            doc: {
              id: 'temp1',
              firstName: 'Mike',
              lastName: 'Stock',
            },
          },
        };

        const newState = fromJS({
          session: {
          },
          collections: {
            users: {
              'temp1': {
                id: 'temp1',
                firstName: 'Mike',
                lastName: 'Stock',
              },
            },
          },
        });

        const { CREATE_RESOURCE } = reducer;
        expect(CREATE_RESOURCE(initialState, action)).to.equal(newState);
      });
    });
    describe('PATCH_RESOURCE', () => {
      it('returns collection with object optimistically updated', () => {
        const initialState = fromJS({
          session: {
          },
          collections: {
            users: {
              '1': {
                id: '1',
                firstName: 'Mike',
                lastName: 'Stock',
              },
            },
          },
        });

        const action = {
          payload: {
            def: Map({
              name: 'users',
            }),
            doc: {
              id: '1',
              firstName: 'Mike',
              lastName: 'Stock',
              newThing: 'brand new',
            },
          },
        };

        const newState = fromJS({
          session: {
          },
          collections: {
            users: {
              '1': {
                id: '1',
                firstName: 'Mike',
                lastName: 'Stock',
                newThing: 'brand new',
              },
            },
          },
        });

        const { PATCH_RESOURCE } = reducer;
        expect(PATCH_RESOURCE(initialState, action)).to.equal(newState);
      });
    });

    describe('DESTROY_RESOURCE', () => {
      it('returns collection with object optimistically removed', () => {
        const initialState = fromJS({
          session: {
          },
          collections: {
            users: {
              '1': {
                id: '1',
                firstName: 'Mike',
                lastName: 'Stock',
              },
            },
          },
        });

        const action = {
          payload: {
            def: Map({
              name: 'users',
            }),
            id: 1,
          },
        };

        const newState = fromJS({
          session: {
          },
          collections: {
            users: {},
          },
        });

        const { DESTROY_RESOURCE } = reducer;
        expect(DESTROY_RESOURCE(initialState, action)).to.equal(newState);
      });
    });
  });
});
