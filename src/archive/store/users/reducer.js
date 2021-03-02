import { DATA_FETCH_SUCCESS } from './actions';

const defaultState = [];

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case DATA_FETCH_SUCCESS:
      return action.users;

    default:
      return state;
  }
}