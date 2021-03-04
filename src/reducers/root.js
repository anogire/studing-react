import { DATA_GET_SUCCESS, DATA_GET_ERROR, DATA_DELETE_ERROR, DATA_UPDATE_ERROR, DATA_CREATE_ERROR } from '../actions/types';

const defaultState = [];

export function reducer(state = defaultState, action) {
  switch (action.type) {

    case DATA_GET_SUCCESS:
      return action.data;

    case DATA_GET_ERROR:
      console.log(action.type, ' in ', action.base);
      return state;

    case DATA_DELETE_ERROR:
    case DATA_UPDATE_ERROR:
    case DATA_CREATE_ERROR:
      console.log(action.type, ' in ', action.base, ' for ', action.param);
      return state;

    default:
      return state;
  }
}