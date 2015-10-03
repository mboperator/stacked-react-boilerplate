import {
  fromJS,
  Map,
  } from 'immutable';
import {
  curry,
  } from 'ramda';
import {
  createAction,
  } from 'redux-actions';

export const ADD_DEFINITION = 'ADD_DEFINITION';

export const addDefinition = createAction(ADD_DEFINITION);

export const handleAddDefinition = curry((def, state) => {
  return state.update(
    'definition',
    definitions => definitions.set(def.name, fromJS(def))
  )
});

const reducer = {
  [ADD_DEFINITION]: (state, {payload}) => {
    return handleAddDefinition(payload, state);
  },
};

export default reducer;
