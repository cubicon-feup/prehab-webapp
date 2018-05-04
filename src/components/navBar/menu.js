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
        this.settingsMenu()
    );
  }

  settingsMenu = () =>{
    console.log(this.props.auth);
    if(this.props.auth === true ) {
       return (
        <div className = "menuDiv">
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
                <Link to= "/settings" style={{ textDecoration: 'none' }}>
                        <Col xs="12">
                              <div>
                                    <img src={Patients} alt="definições" className="patientsImg alignCenter" />
                                    <p className="patientsLabel">Definições</p>
                               </div>
                         </Col>
                  </Link>
            </div>
	        <div className="patients">
		        <Link to= "/nutrition" style={{ textDecoration: 'none' }}>
			        <Col xs="12">
				        <div>
					        <img src={Patients} alt="exercicio" className="patientsImg alignCenter" />
					        <p className="patientsLabel">Nutrition</p>
				        </div>
			        </Col>
		        </Link>
	        </div>
            <div className="logo"><img src={Logo} alt="logo" className="logoImg alignCenter" /></div>
        </div>
    )
    }else{
        return null
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

