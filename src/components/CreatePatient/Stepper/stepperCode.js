import React, {Component} from "react";

//import {getPatientsCode} from "../../../utils/communication-manager";

class StepperCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }
    }

    componentDidMount() {
        //var patientsCode = getPatientsCode();
        //this.setState({code: patientsCode});
        this.setState({code: this.props.accessCode});
    }

    render() {
        return (
            <div className="patient-code-box">
                <div className="alert alert-info">
                    <h5 class="alert-heading">Código do paciente</h5>
                    {this.state.code}
                </div>
                <br/>
            </div>
        );
    }

}

export default StepperCode;
