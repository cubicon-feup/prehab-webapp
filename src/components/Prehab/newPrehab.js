import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {createNewPrehab} from "../../utils/communication-manager";
import RaisedButton from "material-ui/RaisedButton";

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
            startDate: moment()
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

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.token);
        this.prehabFormSubmit(this.state);

    };

    render() {
        return (

            <div>
                <form onSubmit={this.onSubmit}>
                    <DatePicker selected={this.state.surgeryDate} onChange={this.handleChangeSurgery} />
                    <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} />

                    <div className="col-md-6">

                    </div>

                    <div className="other-content-center">
                        <RaisedButton type="submit" primary={true} label="Criar"/>
                    </div>
                </form>
            </div>



        );
    }

    prehabFormSubmit = (form) => {
        createNewPrehab(this.props.token, form)
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
}

export default NewPrehab