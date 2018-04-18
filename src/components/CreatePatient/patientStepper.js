import React, {Component} from "react";
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import StepperForm from "./Stepper/stepperForm";
import StepperPlan from "./Stepper/stepperPlan";
import StepperCode from './Stepper/stepperCode';

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
        };
    }



    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleFinish = () => {
        console.log("Finish");
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <StepperForm token={this.props.token}/>
            case 1:
                return <StepperCode token={this.props.token}/>
            /**case 2:
                return <StepperPlan token={this.props.token}/>;**/
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
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
                    {finished ? (
                        <p>
                            <a

                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({stepIndex: 0, finished: false});
                                }}
                            >
                                Click here
                            </a> to reset the example.
                        </p>
                    ) : (
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div className="other-content-center" style={{marginTop: 12}}>
                                <RaisedButton
                                    label="Anterior"
                                    primary={true}
                                    disabled={stepIndex === 0}
                                    onClick={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label="Próximo"
                                    primary={true}
                                    disabled={stepIndex === 1}
                                    onClick={this.handleNext}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label="Concluir"
                                    disabled={stepIndex!=1}
                                    primary={true}
                                    onClick={this.handleFinish}
                                    style={{marginRight: 12}}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default PatientStepper;
