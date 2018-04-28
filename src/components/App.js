import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../styles/styles.css";
import { BrowserRouter as Router ,Route, Switch  } from "react-router-dom";
import {connect} from "react-redux";
import { getCookieInfo } from "../actions/authActions";

import Home from "./Home/home";
import Login from "./Login/login";
import MainWindow from "./MainWindow/main-window";
import Task from "./PatientActivityTask/task";
import Plan from "./ActivityPlan/plan";
import NavBar from "./navBar/navBar";
import Patient from "./CreatePatient/patient";
import {  Row } from 'reactstrap';

class App extends Component {

    componentDidMount(){
        this.props.getCookieInfo();
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                        {this.createMenu()}
                </Router>
            </MuiThemeProvider>
        );
    }

    createMenu = () => {
        if (this.props.auth === true) {
            return (
                <Row>
                    <div className="menuOuterDiv"><NavBar/></div>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" name="login" component={Login}/>
                            <Route path="/task" name="Task" render={(props) => (<Task auth={this.props.auth} {...props}/>)}/>
                            <Route path="/plan" name="Plan" render={(props) => (<Plan auth={this.props.auth} {...props}/>)}/>
                            <Route path="/patient" name="Patient" render={(props) => (<Patient auth={this.props.auth} {...props}/>)}/>
                            <Route path="/main" name="mainWindow" render={(props) => (<MainWindow auth={this.props.auth} {...props}/>)}/>
                        </Switch>
                    </div>
                </Row>
            )
        }else{
                return(
                <Row>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" name="home" component={Home}/>
                            <Route exact path="/" name="login" component={Login}/>
                        </Switch>
                    </div>
                </Row>
                )
            }
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