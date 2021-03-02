import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { contactFormReducer } from './contactForm';
import { contactsReducer } from './contacts';

const reducer = combineReducers({
  data: contactFormReducer,
  contacts: contactsReducer
});

const middleware = applyMiddleware(reduxThunk);

export const store = createStore(reducer, middleware);