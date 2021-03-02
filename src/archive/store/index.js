import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { usersReducer } from './users';

const reducer = combineReducers({
  users: usersReducer
});

const middleware = applyMiddleware(reduxThunk);

export const store = createStore(reducer, middleware);