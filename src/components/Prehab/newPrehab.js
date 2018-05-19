import React, {Component} from 'react';
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {createNewPrehab} from "../../utils/communication-manager";
import {getDoctorPlan} from "../../utils/communication-manager";
import {getPatientList} from "../../utils/communication-manager";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from "material-ui/Dialog";
import "../../styles/newPrehab_style.css";

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';



class NewPrehab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idPatient: "",
            idPlan : "",
            surgeryDate : moment(),
            startDate: moment(),
            patientList: undefined,
            planList: undefined,
            openDialog : false,
            dialogMessage : "",
            dialogTitle: ""
        };
        this.handleChangeSurgery = this.handleChangeSurgery.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

    handleChangeSurgery(date) {
        this.setState({
            surgeryDate: date
        });
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangePatient = (event, index, value) => this.setState({idPatient: value});

    handleChangePlan = (event, index, value) => this.setState({idPlan: value});

    onSubmit = (e) => {

        const form = {
            idPatient: this.state.idPatient,
            idPlan : this.state.idPlan,
            surgeryDate : this.state.surgeryDate.format('DD-MM-YYYY').toString(),
            startDate: this.state.startDate.format('DD-MM-YYYY').toString()
        }

        e.preventDefault();
        console.log(this.state);
        console.log(this.props.token);
        this.prehabFormSubmit(form);

    };

    componentWillReceiveProps(nextProps) {
        this.patientList(nextProps.token);
        this.planList(nextProps.token)
    }

    componentDidMount() {
        this.patientList(this.props.token);
        this.planList(this.props.token);
    }

    openDialog(title, message){
            this.setState({
                openDialog: true,
                dialogTitle: title,
                dialogMessage: message
            });
    }

    closeDialog = () =>{
        this.setState({
            openDialog: false,
        })
    }

    render() {


        const { idPatient, idPlan } = this.state;

        const actions = [ <RaisedButton label="Ok" primary={true} onClick={this.closeDialog}/> ];

        if(this.state.patientList !== undefined){

        return (

            <div>
                <Dialog
                    contentStyle={{width: "350px",}}
                    title={this.state.dialogTitle}
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.closeDialog}>
                    {this.state.dialogMessage}
                </Dialog>
                <form onSubmit={this.onSubmit}>

                    <div className="row">
                        <div className="col-md-3">
                            <SelectField
                                hintText="Paciente"
                                value={idPatient}
                                fullWidth={true}
                                onChange={this.handleChangePatient}>
                                {this.state.patientList.map( (row) => (
                                    <MenuItem value={row.user} primaryText={row.patient_tag} />
                                ))}
                            </SelectField>
                        </div>

                        <div className="col-md-3">
                            <SelectField
                                hintText="Plano"
                                value={idPlan}
                                fullWidth={true}
                                onChange={this.handleChangePlan}>
                                {this.state.planList.map( (row) => (
                                    <MenuItem value={row.id} primaryText={row.title} />
                                ))}
                            </SelectField>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                             <p className = "col-md-12"> Data da Cirurgia</p>
                             <DatePicker className = "col-md-12" selected={this.state.surgeryDate} onChange={this.handleChangeSurgery} />
                        </div>
                        <div className="col-md-3">
                            <p className = "col-md-12"> Data de Inicio do Prehab</p>
                            <DatePicker className = "col-md-12" selected={this.state.startDate} onChange={this.handleChangeStart} />
                        </div>
                    </div>
                    <div className="other-content-center">
                        <RaisedButton type="submit" primary={true} label="Criar"/>
                    </div>
                </form>
            </div>



        );
        } else{
            return null;
        }

    }

    prehabFormSubmit = (form) => {

        console.log(form);

        console.log(this.props.token);
        createNewPrehab(this.props.token, form)
            .then(response => {

                this.openDialog("SUCESSO", "Prehab criado com sucesso");
                console.log(response);

            })
            .catch((response) => {
                response.then((error) => {

                    this.openDialog("ERRO", error.custom_message);
                    console.log(error);

                })
            });
    };

    patientList(token){
        console.log(token);
        getPatientList(token).then(list => {
            console.log(list);
            this.setState({
                patientList: list.data
            });

        }).catch(err => {
            console.log(err);
            this.setState({
                patientList: undefined
            });
        });
    }

    planList(token){
        console.log(token);
        getDoctorPlan(token).then(list => {
            console.log(list);
            this.setState({
                planList: list.data
            });

        }).catch(err => {
            console.log(err);
            this.setState({
                planList: undefined

            });
        });
    }


}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role
    };
};

export default connect(mapStateToProps, null)(NewPrehab);