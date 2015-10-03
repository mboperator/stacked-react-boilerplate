import { handleActions } from 'redux-actions';
import resource from './resource';
import asyncResource from './asyncResource';
import session from './session';
import definition from './definition';
import { Map } from 'immutable';

export default handleActions({
  ... resource,
  ... asyncResource,
  ... definition,
  ... session,
}, Map());
