import React, {Component} from "react";
import {connect} from "react-redux";
import Logout from "../Logout/logout";
import PatientForm from "./patientForm";
import {getDoctorPlan} from "../../utils/communication-manager";

class Patient extends Component {

    constructor(props){
        super(props);
        this.state = {
            exercisePlans: []
        };
    }

    componentWillMount(){
        getDoctorPlan(this.props.token)
            .then(doctorPlan => {
                console.log(doctorPlan);

                this.setState({ exercisePlans: [ doctorPlan.data ] });

                console.log(this.state);

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
                <PatientForm exercisePlans={this.state.exercisePlans}  token={this.props.token}/>
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


