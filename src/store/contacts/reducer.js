import { CONTACTS_FETCH_SUCCESS } from './actions';

const defaultState = [];

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case CONTACTS_FETCH_SUCCESS:
      return action.contacts;
    default:
      return state;
  }
}