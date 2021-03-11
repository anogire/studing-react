import { combineReducers } from 'redux';
import { photosFetch, photoDelete, photoUpdate, photoCreate, photosByAlbumIdDelete } from './actions';

export const photosReducer = combineReducers({
  list: photosReducerList,
  forAlbum: photosReducerForAlbum,
  map: photosReducerMap
});

function photosReducerList(state = [], action) {
  switch (action.type) {

    case photosFetch.SUCCESS:
      return action.payload;

    case photoCreate.SUCCESS:
      return [...state, action.payload];

    case photoUpdate.SUCCESS:
      return state.map(photo => {
        if (photo.id === action.payload.id) {
          return action.payload;
        }
        return photo;
      });

    case photoDelete.SUCCESS:
      return state.filter(photo => photo.id !== action.payload.id);

    case photosFetch.FAILURE:
    case photoCreate.FAILURE:
    case photoUpdate.FAILURE:
    case photoDelete.FAILURE:
      console.log(action.type);
      return state;

    default:
      return state;
  }
}

function photosReducerForAlbum(state = {}, action) {
  switch (action.type) {

    case photosFetch.SUCCESS:
      return action.payload.reduce((map, photo) => {
        if (map[photo.albumId]) {
          map[photo.albumId] = [...map[photo.albumId], photo];
        } else {
          map[photo.albumId] = [photo];
        }
        return map;
      }, {});

    case photoCreate.SUCCESS:
      if (state[action.payload.albumId]) {
        return {
          ...state,
          [action.payload.albumId]: [...state[action.payload.albumId], action.payload]
        }
      } else {
        return {
          ...state,
          [action.payload.albumId]: [action.payload]
        }
      }

    case photoUpdate.SUCCESS:
      //объединить все фотографии из альбомов в список, обновить, сформировать новый объект

      const stateValues = Object.values(state);
      const stateConcat = stateValues.reduce(function (concat, photo) {
        return concat.concat(photo);
      }, []);
      const stateUpdate = stateConcat.map(photo => {
        if (photo.id === action.payload.id) {
          return action.payload;
        }
        return photo;
      });
      const stateRefresh = stateUpdate.reduce((map, photo) => {
        if (map[photo.albumId]) {
          map[photo.albumId] = [...map[photo.albumId], photo];
        } else {
          map[photo.albumId] = [photo];
        }
        return map;
      }, {});

      return stateRefresh;

    case photoDelete.SUCCESS:
      //удалить всю запись, если в альбоме одна фотография или обновить список фотографий

      if (state[action.payload.albumId].length === 1) {
        delete state[action.payload.albumId];
        return state;
      } else {
        const curValue = state[action.payload.albumId];
        const newValue = curValue.filter(photo => photo.id !== action.payload.id);
        return {
          ...state,
          [action.payload.albumId]: newValue
        };
      }

    case photosByAlbumIdDelete.SUCCESS:
      delete state[action.payload[0].albumId];
      return state;

    default:
      return state;
  }
}

function photosReducerMap(state = {}, action) {
  switch (action.type) {

    case photosFetch.SUCCESS:
      return action.payload.reduce((map, photo) => {
        map[photo.id] = photo;
        return map;
      }, {});

    case photoCreate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case photoUpdate.SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case photoDelete.SUCCESS:
      delete state[action.payload.id];
      return state;

    default:
      return state;
  }
}