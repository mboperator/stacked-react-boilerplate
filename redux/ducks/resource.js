import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  handleMergeResource, handleDestroyLocalResource,
} from '../_shared/util/resourceOperations';

/*
 * Webpack custom module directories don't
 * work with Mocha tests.
 */
import { getBaseUrl } from '../_shared/util/getBaseUrl';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const PATCH_RESOURCE = 'PATCH_RESOURCE';
export const DESTROY_RESOURCE = 'DESTROY_RESOURCE';

export function getConfig() {
  return {
    headers: {
      'X-CSRF-TOKEN': 'FIX ME',
      'Content-Type': 'application/json',
    },
  };
}

export function generateResourceUrl(def) {
  const endpoint = def.get('endpoint');
  const name = def.get('name');
  return `${getBaseUrl()}${endpoint || name}`;
}

/**
 * Returns the following to reducers
 *
 * FETCH_RESOURCE Example
 * { payload: {def: def} }
 *
 * FETCH_RESOURCE_RESOLVED/REJECTED Example
 * { payload: { ...asyncresult }, meta: { def } }
 *
 */
export const fetchResource = createAction(FETCH_RESOURCE, ({def}) => {
  return {
    promise: axios.get(generateResourceUrl(def), getConfig()),
    def,
  };
}, req => (req));

export const createResource = createAction(CREATE_RESOURCE, ({def, doc}) => {
  const one = def.get('keys').get('singular');
  return {
    promise: axios.post(`${getBaseUrl()}${def.get('name')}`, {[one]: doc}, getConfig()),
    def,
    doc,
  };
}, req => (req));

export const patchResource = createAction(PATCH_RESOURCE, ({def, doc}) => {
  const id = doc.id;
  const one = def.get('keys').get('singular');
  return {
    promise: axios.put(`${getBaseUrl()}${def.get('name')}/${id}`, {id, [one]: doc}, getConfig()),
    def,
    doc,
  };
}, req => (req));

export const destroyResource = createAction(DESTROY_RESOURCE, ({def, id}) => {
  return {
    promise: axios.delete(`${getBaseUrl()}${def.get('name')}/${id}`, getConfig()),
    def,
    id,
  };
}, req => (req));

const reducer = {

  [FETCH_RESOURCE]: (state) => {
    return state;
  },

  [CREATE_RESOURCE]: (state, {payload}) => {
    return handleMergeResource(payload.doc, payload, state);
  },

  [PATCH_RESOURCE]: (state, {payload}) => {
    return handleMergeResource(payload.doc, payload, state);
  },

  [DESTROY_RESOURCE]: (state, {payload}) => {
    const {
      id,
      def,
      data
    } = payload;
    const idAttr = def.get('idAttr', 'id');
    const doc = {[idAttr]: id};

    return handleDestroyLocalResource(doc, {def, doc}, state);
  },
};

export default reducer;
