import {
  handleMergeResource,
  handleKeySwapResource,
  handleDestroyResource,
  handleDestroyLocalResource,
  handleSetResource,
} from '../_shared/util/resourceOperations';

export const FETCH_RESOURCE_RESOLVED = 'FETCH_RESOURCE_RESOLVED';
export const FETCH_RESOURCE_REJECTED = 'FETCH_RESOURCE_REJECTED';
export const CREATE_RESOURCE_RESOLVED = 'CREATE_RESOURCE_RESOLVED';
export const CREATE_RESOURCE_REJECTED = 'CREATE_RESOURCE_REJECTED';
export const PATCH_RESOURCE_RESOLVED = 'PATCH_RESOURCE_RESOLVED';
export const PATCH_RESOURCE_REJECTED = 'PATCH_RESOURCE_REJECTED';
export const DESTROY_RESOURCE_RESOLVED = 'DESTROY_RESOURCE_RESOLVED';
export const DESTROY_RESOURCE_REJECTED = 'DESTROY_RESOURCE_REJECTED';


const reducer = {

  [FETCH_RESOURCE_RESOLVED]: (state, {payload, meta}) => {
    const { data } = payload;
    const { def } = meta;

    return handleMergeResource(data, meta, state);
  },

  [FETCH_RESOURCE_REJECTED]: (state, {payload, meta}) => {
    return state;
  },

  [CREATE_RESOURCE_RESOLVED]: (state, {payload, meta}) => {
    const { data } = payload;

    return handleKeySwapResource(data, meta, state);
  },

  [CREATE_RESOURCE_REJECTED]: (state, {payload, meta}) => {
    const { data } = payload;

    return handleDestroyLocalResource(data, meta, state);
  },

  [PATCH_RESOURCE_RESOLVED]: (state, {payload, meta}) => {
    const { data } = payload;
    const { def } = meta;

    return handleMergeResource(data, meta, state);
  },

  [PATCH_RESOURCE_REJECTED]: (state, {payload, meta}) => {
    // TODO: Implement
    return state;
  },

  [DESTROY_RESOURCE_RESOLVED]: (state, {payload, meta}) => {
    return state;
  },

  [DESTROY_RESOURCE_REJECTED]: (state, {payload, meta}) => {
    // TODO: Implement
    return state;
  },
};

export default reducer;
