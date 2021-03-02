import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = applyMiddleware(reduxThunk);

export const store = createStore(rootReducer, middleware);