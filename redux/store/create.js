import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-simple-promise';
import reducer from 'ducks/index';
import { Map } from 'immutable';


const state = reducer(Map(), {
  name: 'CONSTRUCT',
});

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware(),
  loggerMiddleware({
    transformer: object => { return object.toJS ? object.toJS() : object; },
  })
)(createStore);

export default function configureStore(initialState = state) {
  return createStoreWithMiddleware(reducer, initialState);
}
