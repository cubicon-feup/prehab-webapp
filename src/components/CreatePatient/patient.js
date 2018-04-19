import React, {Component} from "react";
import {connect} from "react-redux";
import Logout from "../Logout/logout";
import PatientForm from "./patientForm";

import {getDoctorPlan} from "../../utils/communication-manager";


class Patient extends Component {

    componentWillMount(){
        getDoctorPlan(this.props.token)
            .then(doctorPlan => {
                if(doctorPlan.length > 0){
                    console.log(doctorPlan);
                }
            })
            .catch(err => {
                console.log("Erro: " + err);
            });
    }


    createPatient = () => {
        if(this.props.auth !== true) {
            return (
                <Logout />
            )
        }
        else
        {
            return (

                <PatientForm token={this.props.token}/>

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


