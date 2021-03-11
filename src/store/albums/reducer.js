import { combineReducers } from 'redux';
import { albumsFetch, albumDelete, albumUpdate, albumCreate, albumsByUserIdDelete } from './actions';

export const albumsReducer = combineReducers({
  list: albumsReducerList,
  forUser: albumsReducerForUser,
  map: albumsReducerMap
});

function albumsReducerList(state = [], action) {
  switch (action.type) {

    case albumsFetch.SUCCESS:
      return action.payload;

    case albumCreate.SUCCESS:
      return [...state, action.payload];

    case albumUpdate.SUCCESS:
      return state.map(album => {
        if (album.id === action.payload.id) {
          return action.payload;
        }
        return album;
      });

    case albumDelete.SUCCESS:
      return state.filter(album => album.id !== action.payload.id);

    case albumsFetch.FAILURE:
    case albumCreate.FAILURE:
    case albumUpdate.FAILURE:
    case albumDelete.FAILURE:
      console.log(action.type);
      return state;

    default:
      return state;
  }
}

function albumsReducerForUser(state = {}, action) {
  switch (action.type) {

    case albumsFetch.SUCCESS:
      return action.payload.reduce((map, album) => {
        if (map[album.userId]) {
          map[album.userId] = [...map[album.userId], album];
        } else {
          map[album.userId] = [album];
        }
        return map;
      }, {});

    case albumCreate.SUCCESS:
      if (state[action.payload.userId]) {
        return {
          ...state,
          [action.payload.userId]: [...state[action.payload.userId], action.payload]
        }
      } else {
        return {
          ...state,
          [action.payload.userId]: [action.payload]
        }
      }

    case albumUpdate.SUCCESS:
      //объединить все альбомы пользователя в список, обновить, сформировать новый объект

      const stateValues = Object.values(state);
      const stateConcat = stateValues.reduce(function (concat, album) {
        return concat.concat(album);
      }, []);
      const stateUpdate = stateConcat.map(album => {
        if (album.id === action.payload.id) {
          return action.payload;
        }
        return album;
      });
      const stateRefresh = stateUpdate.reduce((map, album) => {
        if (map[album.userId]) {
          map[album.userId] = [...map[album.userId], album];
        } else {
          map[album.userId] = [album];
        }
        return map;
      }, {});
      return stateRefresh;

    case albumDelete.SUCCESS:
      //удалить всю запись, если у пользователя один альбом или обновить список альбомов

      if (state[action.payload.userId].length === 1) {
        delete state[action.payload.userId];
        return state;
      } else {
        const curValue = state[action.payload.userId];
        const newValue = curValue.filter(album => album.id !== action.payload.id);
        return {
          ...state,
          [action.payload.userId]: newValue
        };
      }

    case albumsByUserIdDelete.SUCCESS:
      delete state[action.payload[0].userId];
      return state;

    default:
      return state;
  }
}

function albumsReducerMap(state = {}, action) {
  switch (action.type) {

    case albumsFetch.SUCCESS:
      return action.payload.reduce((map, album) => {
        map[album.id] = album;
        return map;
      }, {});

    case albumCreate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case albumUpdate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case albumDelete.SUCCESS:
      delete state[action.payload.id];
      return state;

    default:
      return state;
  }
}