import React, { Component } from "react";
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom"
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import Notifications from "./notification";
import "../../styles/menu_style.css";
import Logo from "../../res/img/logo.svg";
import Dashboard from "../../res/img/dashboard.svg";
import Patients from "../../res/img/patients.svg";


class menu extends Component {
render() {
    return (
        /*<Toolbar style={{"backgroundColor": "#00bcd4"}}>
            <ToolbarGroup>
                <Link to="/main">
                    <ToolbarTitle text="Prehab" />
                </Link>
            </ToolbarGroup>
            <ToolbarGroup firstChild={true}>
                <ToolbarSeparator />
                    <Link to="/login">
                        <MenuItem primaryText="Login"/>
                    </Link>
                    <Link to="/task"><MenuItem primaryText="Task"/></Link>
                    <Link to="/plan"><MenuItem primaryText="Plan"/></Link>
                    <Link to="/notifications">
                        <Notifications />
                    </Link>
            </ToolbarGroup>
        </Toolbar>*/

        /*<Drawer docked = {true} width={300}>
                <Link to="/task"><MenuItem primaryText="Task"/></Link>
                <Link to="/plan"><MenuItem primaryText="Plan"/></Link>
        </Drawer>*/

        <div className = "menuDiv">

            {this.settingsMenu()}

            <div className="patients">
                <Link to= "/plan" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Dashboard} className="patientsImg alignCenter"></img>
                            <p className="patientsLabel">Dashboard</p>
                        </div>
                    </Col>
                </Link>
            </div>

            <div className="patients">
                <Link to= "/plan" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Patients} className="patientsImg alignCenter"></img>
                            <p className="patientsLabel">Planos</p>
                        </div>
                    </Col>
                </Link>
            </div>
            <div className="patients">
                <Link to= "/main" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Patients} className="patientsImg alignCenter"></img>
                            <p className="patientsLabel">Pacientes</p>
                        </div>
                    </Col>
                </Link>
            </div>

           <div className="logo"><img src={Logo} className="logoImg alignCenter"></img></div>

        </div>
    );
  }

  settingsMenu = () =>{
  console.log(this.props.auth);
    if(this.props.auth === true ) {
       return (
            <div className="patients">
                <Link to= "/task" style={{ textDecoration: 'none' }}>
                        <Col xs="12">
                              <div>
                                    <img src={Patients} className="patientsImg alignCenter"></img>
                                    <p className="patientsLabel">Exercícios</p>
                               </div>
                         </Col>
                  </Link>
            </div>
                )
    }
  }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token: state.auth.accessToken

    };
};

export default connect(mapStateToProps, null)(menu);
