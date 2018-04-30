import React, { Component } from "react";
import {connect} from "react-redux";
import { Col } from 'reactstrap';
import { Link } from "react-router-dom"
//import MenuItem from "material-ui/MenuItem";
//import Drawer from "material-ui/Drawer";
//import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
//import Notifications from "./notification";
import "../../styles/menu_style.css";
import Logo from "../../images/icons/logo.svg";
import Dashboard from "../../images/icons/dashboard.svg";
import Patients from "../../images/icons/patients.svg";


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
                <Link to= "/prehab" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Dashboard} alt="dashboard" className="patientsImg alignCenter" />
                            <p className="patientsLabel">Prehabs</p>
                        </div>
                    </Col>
                </Link>
            </div>

            <div className="patients">
                <Link to= "/plan" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Patients} alt="plan" className="patientsImg alignCenter" />
                            <p className="patientsLabel">Planos</p>
                        </div>
                    </Col>
                </Link>
            </div>
            <div className="patients">
                <Link to= "/main" style={{ textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={Patients} alt="main" className="patientsImg alignCenter" />
                            <p className="patientsLabel">Pacientes</p>
                        </div>
                    </Col>
                </Link>
            </div>

           <div className="logo"><img src={Logo} alt="logo" className="logoImg alignCenter" /></div>

        </div>
    );
  }

  settingsMenu = () =>{
  console.log(this.props.auth);
    if(this.props.auth === true ) {
       return (
            <div className="patients">
                <Link to= "/settings" style={{ textDecoration: 'none' }}>
                        <Col xs="12">
                              <div>
                                    <img src={Patients} alt="definições" className="patientsImg alignCenter" />
                                    <p className="patientsLabel">Definições</p>
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

