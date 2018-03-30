import React from 'react';
import { render } from 'react-dom';
import AppContainer from './components/App-container';
import { Provider } from 'react-redux';
import { BrowserRouter as Router  } from 'react-router-dom';
import store from './store/store';

//import { Router, Route, hashHistory } from 'react-router'


import App from './components/App'


render(
    <Provider store={store}>
        <Router component={AppContainer}>
            <App />
        </Router>
  </Provider>
, document.getElementById('root'));