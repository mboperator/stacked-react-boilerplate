import { identity } from 'ramda';

/** Example sessionSelector

function locationSessionSelector (session){
  return {
    selected: session.get('selected', List([null])),
    temp: session.get('temp', List()),
    editing: session.get('editing', null),
    value: session.get('value', null),
    activeIndex: session.get('activeIndex', 0),
    entry: session.get('entry', null),
  };
}

**/

function mergePropsWithSessionFactory(sessionSelector = identity){
  return (stateProps, dispatchProps, props) => {

    const {
      sessionId,
      } = props;

    const session = stateProps.session.get(sessionId, Map());

    const state = sessionSelector(session);

    return {... props, ... dispatchProps, ... state, ... stateProps, setSession: update => dispatchProps.setSession({id: sessionId, update})}
  }
}