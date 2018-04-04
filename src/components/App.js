import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';
import { BrowserRouter as Router ,Route, Switch  } from 'react-router-dom';

import Home from './Home/home'
import Login from './Login/login'
import MainWindow from './MainWindow/main-window'
import Task from './PatientActivityTask/task'
import Plan from './ActivityPlan/plan'
import NavBar from './navBar/NavBar'
import {connect} from "react-redux";
import { getCookieInfo } from "../actions/authActions";

class App extends Component {

    componentDidMount(){
        this.props.getCookieInfo();
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <NavBar/>
                        <Switch>
                            <Route exact path="/" name="home" component={Home}/>
                            <Route path="/login" name="login" component={Login}/>
                            <Route path="/task" name="Task" render={(props) => (<Task auth={this.props.auth} {...props}/>)}/>
                            <Route path="/plan" name="Plan" render={(props) => (<Plan auth={this.props.auth} {...props}/>)}/>
                            <Route path="/main" name="mainWindow" render={(props) => (<MainWindow auth={this.props.auth} {...props}/>)}/>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCookieInfo: () =>{
            dispatch(getCookieInfo());
        }
    };
}

export default connect(null, mapDispatchToProps)(App);