import {
  fromJS,
  Map,
  } from 'immutable';
import {
  curry,
  identity,
  } from 'ramda';
import {
  createAction,
  } from 'redux-actions';

import _ from 'lodash';

export const SET_SESSION = 'SET_SESSION';
export const CLOSE_SESSION = 'CLOSE_SESSION';

export const setSession = createAction(SET_SESSION);
export const closeSession = createAction(CLOSE_SESSION);

export const handleSetSession = curry(({id, update}, state) => {
  return state.updateIn(
    ['session', id],
    Map(),
      session => session.merge(fromJS(update))
  );
});

export function handleCloseSession(remove, state) {
  return state.update(
    'session',
    session => _.isArray(remove) ? session.deleteIn(fromJS(remove)) : session.delete(remove)
  );
}

const reducer = {
  [SET_SESSION]: (state, {payload}) => {
    return handleSetSession(payload, state);
  },
  [CLOSE_SESSION]: (state, {payload}) => {
    return handleCloseSession(payload, state);
  },
};

export function mergePropsWithSessionFactory(sessionSelector = identity) {
  return (stateProps, dispatchProps, props) => {
    const {
      sessionId,
      } = props;

    const session = stateProps.session.get(sessionId, {});

    const state = sessionSelector(session);

    return {
      ... props,
      ... dispatchProps,
      ... state,
      ... stateProps,
      setSession: update => dispatchProps.setSession(
        {id: sessionId, update}
      ),
    };
  };
}

export default reducer;
