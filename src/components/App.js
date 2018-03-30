import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';
import { Route, Switch  } from 'react-router-dom';

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
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" name="Login" component={Login} />
            <Route path="/main" name="Main" component={MainWindow} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;