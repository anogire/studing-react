import { combineReducers } from 'redux';
import { usersFetch, userDelete, userUpdate, userCreate } from './actions';

export const usersReducer = combineReducers({
  list: usersReducerList,
  map: usersReducerMap
});

function usersReducerList(state = [], action) {
  switch (action.type) {

    case usersFetch.SUCCESS:
      return action.payload;

    case userCreate.SUCCESS:
      return [...state, action.payload];

    case userUpdate.SUCCESS:
      return state.map(user => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

    case userDelete.SUCCESS:
      return state.filter(user => user.id !== action.payload.id);

    case usersFetch.FAILURE:
    case userCreate.FAILURE:
    case userUpdate.FAILURE:
    case userDelete.FAILURE:
      console.log(action.type);
      return state;

    default:
      return state;
  }
}

function usersReducerMap(state = {}, action) {
  switch (action.type) {

    case usersFetch.SUCCESS:
      return action.payload.reduce((map, user) => {
        map[user.id] = user;
        return map;
      }, {});

    case userCreate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case userUpdate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case userDelete.SUCCESS:
      delete state[action.payload.id];
      return state;

    default:
      return state;
  }
}