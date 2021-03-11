import { ALBUMS_GET_SUCCESS, ALBUMS_GET_ERROR, ALBUMS_DELETE_ERROR, ALBUMS_UPDATE_ERROR, ALBUMS_CREATE_ERROR } from './types';

const defaultState = [];

export function reducer(state = defaultState, action) {

  switch (action.type) {

    case ALBUMS_GET_SUCCESS:
      return action.albums;

    case ALBUMS_GET_ERROR:
    case ALBUMS_DELETE_ERROR:
    case ALBUMS_UPDATE_ERROR:
    case ALBUMS_CREATE_ERROR:
      console.log(action.type);
      return state;

    default:
      return state;
  }
}