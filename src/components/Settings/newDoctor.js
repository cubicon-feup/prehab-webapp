import React, {Component} from "react";
import {createNewDoctor} from "../../utils/communication-manager";
import DoctorForm from "./doctorForm";
import { connect } from "react-redux";
import "../../styles/newDoctor_style.css";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

class NewDoctor extends Component{

    constructor(props){
        super(props);

        this.state = {

            openDialog: false,
            dialogTitle: "",
            dialogMessage: ""

        };

    }

    doctorFormSubmit = (form) => {
        createNewDoctor(this.props.token, form)
            .then(response => {

                this.openDialog("SUCESSO", "Médico criado com sucesso");
                console.log(response);

            })
            .catch((response) => {
                response.then((error) => {

                    this.openDialog("ERRO", error.custom_message);
                    console.log(error);

                })

            });
    };

    openDialog(title, message){
        this.setState({
            openDialog: true,
            dialogTitle: title,
            dialogMessage: message
        });
    }

    handleClose = () => {
            this.setState({openDialog: false});
    };


    render(){

    const actions = [
        <RaisedButton
            label="Ok"
            primary={true}
            onClick={this.handleClose}
        />,
    ];
        return (
            <div>
                <Dialog
                    contentStyle={{width: "350px",}}
                    title={this.state.dialogTitle}
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}>
                    {this.state.dialogMessage}
                </Dialog>
                <div className="registoLabel">
                    Registo de Médico
                </div>
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