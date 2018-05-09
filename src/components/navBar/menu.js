import React, { Component } from "react";
import {connect} from "react-redux";
import { Col } from 'reactstrap';
import { Link } from "react-router-dom"
import "../../styles/menu_style.css";
import Logo from "../../images/icons/logo.svg";
import Dashboard from "../../images/icons/dashboard.svg";
import Patients from "../../images/icons/patients.svg";
import User from "../../images/icons/user.svg";

class menu extends Component {
render() {
    if(this.props.auth === true ) {
    return (
        <div className = "menuDiv">
            <div className="patients">
                <Link to= "/" style={{textDecoration: 'none' }}>
                    <Col xs="12">
                        <div>
                            <img src={User} alt="dashboard" className="userImg alignCenter" />
                            <p className="patientsLabel"></p>
                        </div>
                    </Col>
                </Link>
            </div>

            <div className="patients">
                <Link to= "/main" style={{ textDecoration: 'none' }}>
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
                            <Link to= "/buttonlogout" style={{ textDecoration: 'none' }}>
                                    <Col xs="12">
                                            <p className="patientsLabel">Sair</p>
                                     </Col>
                              </Link>
                </div>
            <div className="logo"><img src={Logo} alt="logo" className="logoImg alignCenter" /></div>
         </div>

    );
    }else{
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
