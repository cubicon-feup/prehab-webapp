import React, {Component} from "react";
import {connect} from "react-redux";
import Logout from "../Logout/logout";
import PatientForm from "./patientForm";

class Patient extends Component {

    createPatient = () => {
        if(this.props.auth !== true) {
            return (
                <Logout />
            )
        }
        else
        {
            return (
                <PatientForm />
            )
        }
    }

    render() {
        return (
            <div className="row" >
                <div className="col-md-2" />
                <div className="col-md-8" >
                    {this.createPatient()}
                </div>
                <div className="col-md-2" />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token: state.auth.accessToken
    };
};

export default connect(mapStateToProps, null)(Patient);


