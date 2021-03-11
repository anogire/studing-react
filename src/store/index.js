import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));