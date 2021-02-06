//import $ from 'jquery';
//import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import './index.scss';
import reportWebVitals from './reportWebVitals';


import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ToDoList from './components/ToDoList';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Header />
      <ToDoList />
      <Footer />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();