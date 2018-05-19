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
import Logout from "../../images/icons/logout.svg";
import Patients from "../../images/icons/patients.svg";
import Doctors from "../../images/icons/doctors.svg";
import Nutrition from "../../images/icons/nutrition.svg";
import Tasks from "../../images/icons/tasks.svg";
import Prehabs from "../../images/icons/prehabs.svg";

class menu extends Component {
    render() {
        if(this.props.auth === true ) {
            return (
                <div className = "menuDiv">        
                    <div className="patients">
                        <Link to= "/prehab" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Prehabs} alt="dashboard" className="doctorsImg alignCenter" />
                                    <p className="patientsLabel">Prehabs</p>
                                </div>
                            </Col>
                        </Link>
                    </div>
                    
                    <div className="patients">
                        <Link to= "/patient" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Patients} alt="main" className="patientsImg alignCenter" />
                                    <p className="patientsLabel">Pacientes</p>
                                </div>
                            </Col>
                        </Link>
                    </div>
        
                    <div className="patients">
                        <Link to= "/plan" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Tasks} alt="plan" className="doctorsImg alignCenter" />
                                    <p className="patientsLabel">Tarefas</p>
                                </div>
                            </Col>
                        </Link>
                    </div>

                    {this.settingsMenu()}

                    <div className="patients">
                        <Link to= "/logout" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Logout} alt="plan" className="doctorsImg alignCenter" />
                                    <p className="patientsLabel">Sair</p>
                                </div>
                            </Col>
                        </Link>
                    </div>
        
                    <div className="logo"><img src={Logo} alt="logo" className="logoImg alignCenter" /></div>
                </div>
            );
        } else {
            return null;
        }
    }

    settingsMenu = () => {
        console.log(this.props.role);

        if  (this.props.auth === true && this.props.role === "Admin") {
            return (
                <div className="patients">
                    <div className="patients">
                        <Link to= "/doctor" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Doctors} alt="definições" className="doctorsImg alignCenter" />
                                    <p className="patientsLabel">Médicos</p>
                                </div>
                            </Col>
                        </Link>
                    </div>

                    <div className="patients">
                        <Link to= "/nutrition" style={{ textDecoration: 'none' }}>
                            <Col xs="12">
                                <div>
                                    <img src={Nutrition} alt="definições" className="doctorsImg alignCenter" />
                                    <p className="patientsLabel">Nutrição</p>
                                </div>
                            </Col>
                        </Link>
                    </div>    
                </div>     
            );
        } else{
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token: state.auth.accessToken,
        role: state.auth.role
    };
};

export default connect(mapStateToProps, null)(menu);
