import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { usersReducer } from './users';
import { albumsReducer } from './albums';

const rootReducer = combineReducers({
  users: usersReducer,
  albums: albumsReducer
});

const middleware = applyMiddleware(reduxThunk);

export const store = createStore(rootReducer, middleware);