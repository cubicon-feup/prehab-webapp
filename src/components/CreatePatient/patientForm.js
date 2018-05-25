import React, {Component} from "react";
import PatientStepper from "./patientStepper";

class PatientForm extends Component{

    render() {
        return (
            <div className="content-middle-page">
                <PatientStepper token={this.props.token}/>
            </div>
        );
    }
}

export default PatientForm;