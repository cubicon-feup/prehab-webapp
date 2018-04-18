import React, {Component} from "react";
import TextField from "material-ui/TextField";
import PlanStepper from "./Stepper/planStepper";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import {createNewPlan} from "../../utils/communication-manager";
import {FormErrors} from "../../utils/formErrors";

class planForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planTitle: "",
            number_of_weeks: this.props.steps,
            week: [],
            openDialog: false,
            submitMessage: "Erro - Registo de plano falhou",
            formErrors: {planTitle: ''},
            planTitleValid: false,
            formValid: false

        };
    }

    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let planTitleValid = this.state.planTitleValid;

  switch(fieldName) {
    case 'planTitle':
      planTitleValid = value.length >= 6;
      fieldValidationErrors.planTitle = planTitleValid ? '' : ' Nome do plano demasiado curto';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  planTitleValid: planTitleValid
                  }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.planTitleValid});
}

    handleClose = () => {
        this.setState({openDialog: false});
    };
  /*  handleNameChange = (evt) => {
        this.setState({ planTitle: evt.target.value });
    }*/

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
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
              </div>
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
                            name="planTitle"
                            value={this.state.planTitle}
                            onChange={this.handleUserInput}
                            hintText="Nome do Plano"
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
