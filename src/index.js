import React from 'react';
import { render } from 'react-dom';
import store from './store/store';
import AppContainer from './components/App-container';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route   } from 'react-router-dom';
//import { Router, Route, hashHistory } from 'react-router'


import Home from './components/Home/home'
import Login from './components/Login/login'
import MainWindow from './components/MainWindow/main-window'
import App from './components/App'


render(
    <Provider store={store}>
        <Router component={AppContainer}>
            <App>
                
                <Route exact path="/" component={Home} />
                <Route path="/login" name="Login" component={Login} />
                <Route path="/main" name="Main" component={MainWindow} />
            </App>
        </Router>
  </Provider>
, document.getElementById('root'));