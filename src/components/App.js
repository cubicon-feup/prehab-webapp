import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';
import { BrowserRouter as Router ,Route, Switch  } from 'react-router-dom';

import Home from './Home/home'
import Login from './Login/login'
import MainWindow from './MainWindow/main-window'

class App extends Component {

  componentDidMount(){
    console.log(this.props);
  }


  render() {
    return (
      <MuiThemeProvider>
          <Router>
              <Switch>
                  <Route path="/login" name="login" component={Login}/>
                  <Route exact path="/" name="home" component={Home}/>
                  <Route path="/main" name="mainWindow" render={(props) => (<MainWindow auth={this.props.auth} {...props}/>)}/>
              </Switch>
          </Router>
      </MuiThemeProvider>
    );
  }
}


export default (App);