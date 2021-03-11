import { USERS_GET_SUCCESS, USERS_GET_ERROR, USERS_DELETE_ERROR, USERS_UPDATE_ERROR, USERS_CREATE_ERROR } from './types';

const defaultState = [];

export function reducer(state = defaultState, action) {

  switch (action.type) {

    case USERS_GET_SUCCESS:
      return action.users;

    case USERS_GET_ERROR:
    case USERS_DELETE_ERROR:
    case USERS_UPDATE_ERROR:
    case USERS_CREATE_ERROR:
      console.log(action.type);
      return state;

    default:
      return state;
  }
}