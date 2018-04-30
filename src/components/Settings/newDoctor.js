import React, {Component} from "react";
import {createNewDoctor} from "../../utils/communication-manager";
import DoctorForm from "./doctorForm";
import { connect } from "react-redux";

class NewDoctor extends Component{

    constructor(props){
        super(props);

    }

    doctorFormSubmit = (form) => {
        createNewDoctor(this.props.token, form)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log("Erro: " + err);
            });
    };

    render(){
        return (
            <div>
                <DoctorForm doctorFormSubmit={this.doctorFormSubmit.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role

    };
};

export default connect(mapStateToProps, null)(NewDoctor);