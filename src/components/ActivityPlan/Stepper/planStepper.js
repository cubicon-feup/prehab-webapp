import React, {Component} from "react";
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import StepPlan from './stepPlan';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class PlanStepper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            week_plan: []
        };
    }


    createSteps = (number_of_steps) => {
        //let steps = []
        console.log("Steps: " + number_of_steps);
        let children = [];
        for (let i = 0; i < number_of_steps; i++) {
            //Inner loop to create children
            children.push(<Step key={i}><StepLabel>Semana {i+1}</StepLabel></Step>)
        }
        children.push(<Step key={number_of_steps}><StepLabel>Criar Plano</StepLabel></Step>);
        //steps.push(<Stepper activeStep={1}>{children}</Stepper>)
        return children
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4,
        });

        console.log(this.state.week_plan);
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getFormData(formData){
        console.log(formData);
        const {stepIndex} = this.state;
        const {stepNumber} = this.props;
        //this.setState({ week_plan: { ...this.state.week_plan, week_number: (stepIndex+1), task: formData}});
        this.setState(prevState => ({
            week_plan: [...prevState.week_plan, {week_number: (stepIndex+1), tasks: formData}],
            stepIndex: stepIndex + 1,
            finished: stepIndex >= stepNumber,
        }));
    }

    getStepContent(stepIndex) {
        if(this.props.stepNumber === 2)
        {
            switch (stepIndex) {
                case 0:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)} list={this.props.list}/>;
                case 1:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)}  list={this.props.list}/>;
                default: return 'wrong'
            }
        }
        else if(this.props.stepNumber === 4)
        {
            switch (stepIndex) {
                case 0:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)} list={this.props.list}/>;
                case 1:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)} list={this.props.list}/>;
                case 2:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)} list={this.props.list}/>;
                case 3:
                    return <StepPlan key={stepIndex} onFormSubmit={this.getFormData.bind(this)} list={this.props.list}/>;
                default: return 'wrong'
            }
        }
        else {
            return 'wrong'
        }

    }

    submitForm = () =>{
        console.log(this.state.week_plan);
        this.props.formComplete(this.state.week_plan);
    };

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const {stepNumber} = this.props;

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    {this.createSteps(stepNumber)}
                </Stepper>
                <div style={contentStyle}>
                    {stepIndex === stepNumber ? (
                        <div>
                            <RaisedButton label="Enviar Formulário" primary={true} onClick={this.submitForm} />
                        </div>
                    ) : (
                        <div>{this.getStepContent(stepIndex)}</div>
                    )}
                </div>
            </div>
        );
    }
}

export default PlanStepper;