import React, {Component} from "react";
import TextField from "material-ui/TextField";
import PlanStepper from "./Stepper/planStepper";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import {createNewPlan} from "../../utils/communication-manager";

class planForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planTitle: "",
            number_of_weeks: this.props.steps,
            week: [],
            openDialog: false,
            submitMessage: "Erro - Registo de plano falhou"

        };
    }

    handleClose = () => {
        this.setState({openDialog: false});
    };

    handleNameChange = (evt) => {
        this.setState({ planTitle: evt.target.value });
    }

    createSteps = () => {
        return(
            <PlanStepper formComplete={this.createNewPlan.bind(this)} list={this.props.list} token={this.props.token} stepNumber={this.props.steps}/>
        )
    }

    createNewPlan(completeForm){
        //console.log(completeForm);
        createNewPlan(this.props.token, this.state.planTitle, this.props.steps, completeForm)
            .then(sucess => {
                this.setState({
                    openDialog: true,
                    submitMessage: "Novo plano criado com sucesso"
                });
            })
            .catch(err => {
                console.log("Erro: "+ err);
            });
    }


    render() {
        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className="container">
                <Dialog
                    contentStyle={{width: "350px",}}
                    title="Notificação de registo"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                >
                    {this.state.submitMessage}
                </Dialog>
                <div className="row">
                    <div className="col-md-2" >
                        <h1>Criar Plano</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            name="Activity Plan name"
                            value={this.state.planTitle}
                            onChange={this.handleNameChange}
                            hintText="Insert name"
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    {this.createSteps()}
                    </div>
                </div>
            </div>
        )
    }
}

export default planForm;

/**/