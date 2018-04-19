import React, {Component} from "react";
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
//import RaisedButton from 'material-ui/RaisedButton';
import StepperForm from "./Stepper/stepperForm";
import StepperCode from './Stepper/stepperCode';
import {createNewPatient} from "../../utils/communication-manager";


/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class PatientStepper extends Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            accessCode: ''
        };
    }



	patientFormSubmit = (form) => {
		createNewPatient(this.props.token, form)
			.then(response => {
				const {stepIndex} = this.state;
				console.log(response);
				this.setState({
                    accessCode: response.data.access_code,
					stepIndex: stepIndex + 1,
				});
			})
			.catch(err => {
				console.log("Erro: " + err);
			});
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <StepperForm token={this.props.token} patientFormSubmit={this.patientFormSubmit.bind(this)}/>;
            case 1:
                return <StepperCode token={this.props.token} accessCode={this.state.accessCode}/>;
            /**case 2:
                return <StepperPlan token={this.props.token}/>;**/

            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Registar Paciente</StepLabel>
                    </Step>
                    <Step>

                        <StepLabel>Código de acesso</StepLabel>

                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>

                </div>
            </div>
        );
    }
}


export default PatientStepper;

