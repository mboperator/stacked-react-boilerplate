import reducer from '../asyncResource';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS, Map } from 'immutable';

const {describe, it, before} = global;

describe('resource', () => {
  before(() => {
    chai.use(chaiImmutable);
    chai.config.truncateThreshold = 0;
  });

  describe('reducer', () => {
    describe('FETCH_RESOURCE_RESOLVED', () => {
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
              },
            ],
          },
          meta: {
            def: Map({
              name: 'users',
            }),
          },
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

        const { FETCH_RESOURCE_RESOLVED } = reducer;
        expect(FETCH_RESOURCE_RESOLVED(initialState, action)).to.equal(newState);
      });
    });

    describe('FETCH_RESOURCE_REJECTED', () => {
      it('returns state', () => {
        const initialState = fromJS({
          session: {},
          collections: {},
        });

        const action = {
          payload: {
          },
          meta: {
            def: Map({
              name: 'users',
            }),
          },
        };

        const { FETCH_RESOURCE_REJECTED } = reducer;
        expect(FETCH_RESOURCE_REJECTED(initialState, action)).to.equal(initialState);
      });
    });

    describe('CREATE_RESOURCE_RESOLVED', () => {
      it('returns a new state that includes swaps the id of the created item', () => {
        const initialState = fromJS({
          session: {},
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

        const action = {
          payload: {
            data: {
              id: 1,
              firstName: 'Mike',
              lastName: 'Stock',
            },
          },
          meta: {
            def: Map({
              name: 'users',
              idAttr: 'id',
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
              '1': {
                id: 1,
                firstName: 'Mike',
                lastName: 'Stock',
              },
            },
          },
        });

        const { CREATE_RESOURCE_RESOLVED } = reducer;
        expect(CREATE_RESOURCE_RESOLVED(initialState, action)).to.equal(newState);
      });
      it('returns a new state that merges new data from the successful request', () => {
        const initialState = fromJS({
          session: {},
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

        const action = {
          payload: {
            data: {
              id: 1,
              firstName: 'Mike',
              lastName: 'Stock',
              newKey: 'some stuff',
            },
          },
          meta: {
            def: Map({
              name: 'users',
              idAttr: 'id',
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
              '1': {
                id: 1,
                firstName: 'Mike',
                lastName: 'Stock',
                newKey: 'some stuff',
              },
            },
          },
        });

        const { CREATE_RESOURCE_RESOLVED } = reducer;
        expect(CREATE_RESOURCE_RESOLVED(initialState, action)).to.equal(newState);
      });
    });

    describe('CREATE_RESOURCE_REJECTED', () => {
      it('returns a new state that removes the user that failed to post', () => {
        const initialState = fromJS({
          session: {},
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

        const action = {
          payload: {},
          meta: {
            def: Map({
              name: 'users',
              idAttr: 'id',
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
            users: {},
          },
        });

        const { CREATE_RESOURCE_REJECTED } = reducer;
        expect(CREATE_RESOURCE_REJECTED(initialState, action)).to.equal(newState);
      });
    });

    describe('PATCH_RESOURCE_RESOLVED', () => {
      it('returns a new state with the updated item merged with server changes', () => {
        const initialState = fromJS({
          session: {},
          collections: {
            users: {
              '1': {
                id: 1,
                firstName: 'Mike',
                lastName: 'Stock',
                newThing: 'new',
              },
            },
          },
        });

        const action = {
          payload: {
            data: {
              id: 1,
              firstName: 'Mike',
              lastName: 'Stock',
              newThing: 'new',
              sideEffect: 'another new thing',
            },
          },
          meta: {
            def: Map({
              name: 'users',
              idAttr: 'id',
            }),
            doc: {
              id: '1',
              firstName: 'Mike',
              lastName: 'Stock',
              newThing: 'new',
            },
          },
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
                newThing: 'new',
                sideEffect: 'another new thing',
              },
            },
          },
        });

        const { PATCH_RESOURCE_RESOLVED } = reducer;
        expect(PATCH_RESOURCE_RESOLVED(initialState, action)).to.equal(newState);
      });
    });

    describe.skip('PATCH_RESOURCE_REJECTED', () => {
      it('needs to be implemented', () => {

      });
    });

    describe('DESTROY_RESOURCE_RESOLVED', () => {
      it('returns state', () => {
        const initialState = fromJS({
          session: {},
          collections: {
            users: {},
          },
        });

        const action = {};

        const newState = fromJS({
          session: {
          },
          collections: {
            users: {},
          },
        });

        const { DESTROY_RESOURCE_RESOLVED } = reducer;
        expect(DESTROY_RESOURCE_RESOLVED(initialState, action)).to.equal(newState);
      });
    });


    describe.skip('DESTROY_RESOURCE_REJECTED', () => {
      it('needs to be implemented', () => {

      });
    });

  });
});
