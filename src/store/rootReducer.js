import { combineReducers } from 'redux';

import { usersReducer } from './users';
import { albumsReducer } from './albums';
import { photosReducer } from './photos';

export const rootReducer = combineReducers({
  users: usersReducer,
  albums: albumsReducer,
  photos: photosReducer
});