import R from 'ramda';
import { Map, fromJS } from 'immutable';

export const getByKey = R.curry((key, map) => {
  return map.get(key);
});

export const getName = getByKey('name');

export function isArray(value) {
  return R.is(Array)(value);
}

export function generateHash(idAttr = 'id', array) {
  return array.reduce((memo, obj) => {
    memo[obj[idAttr]] = obj;
    return memo;
  }, {});
}

export const serializeResult = R.curry((resourceDef, data) => {
  const idAttr = resourceDef.get('idAttr', 'id');
  return isArray(data) ? generateHash(idAttr, data) : { [data[idAttr]]: data };
});

export function createResourceOperation(method, transform = R.identity) {
  return R.curry((data, {def, doc}, state) => {
    const transformed = R.compose(
      transform,
      serializeResult(def)
    )(data);

    return state.updateIn(
      ['collections', getName(def)],
      Map({}),
      collection => isArray(data) ? transformed : collection[method](transformed)
    );
  });
}

export const handleMergeResource = createResourceOperation('merge', fromJS);
export const handleSetResource = createResourceOperation('set', fromJS);

export function handleKeySwapResource(data, {def, doc}, state) {
  const idAttr = def.get('idAttr', 'id');
  const newId = data[idAttr];
  const oldId = doc[idAttr];

  return state.updateIn(
    ['collections', getName(def)],
    Map({}),
    collection =>
      collection
        .reduce((memo, obj) => {
          if (obj.get(idAttr) === oldId) {
            // IDs need to be strings to make tests pass... is this ok?
            return memo.set(`${newId}`, obj.mergeDeep(fromJS(data)));
          }
          return memo.set(`${obj[idAttr]}`, obj);
        }, Map())
  );
}

export function handleDestroyLocalResource(data, {def, doc}, state) {
  const idAttr = def.get('idAttr', 'id');
  const oldId = doc[idAttr];

  return state.updateIn(
    ['collections', getName(def)],
    Map({}),
    collection => collection.delete(`${oldId}`)
  );
}
