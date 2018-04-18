import React, {Component} from "react";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SelectPatientType from "./selectPatientType";
import RaisedButton from "material-ui/RaisedButton";
import {createNewPatient} from "../../../utils/communication-manager";


class StepperForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            sex: "",
            height: "",
            weight: "",
            age: "",
            constraints: [],
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    }

    handleChange = (event, index, value) => this.setState({sex: value});

    onChangePatientType = (newType) => {
        this.setState({ constraints: newType });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.token);
        createNewPatient(this.props.token, this.state)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log("Erro: " + err);
            });
    }


    render() {
        const { errors, email, sex, height, weight, age } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="row ">
                    <TextField
                        name="email"
                        value={email}
                        type="email"
                        errorText={errors.email}
                        onChange={this.onChange}
                        hintText="Insert email"
                        fullWidth={true}

                    />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <TextField
                            name="weight"
                            value={weight}
                            type="number"
                            errorText={errors.weight}
                            onChange={this.onChange}
                            hintText="Inserir Peso"
                            fullWidth={true}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextField
                            name="age"
                            value={age}
                            type="number"
                            fullWidth={true}
                            errorText={errors.age}
                            onChange={this.onChange}
                            hintText="Insert age"
                        />
                    </div>
                    <div className="col-md-4s">
                        <TextField
                            name="height"
                            fullWidth={true}
                            value={height}
                            type="number"
                            errorText={errors.height}
                            onChange={this.onChange}
                            hintText="Inserir Altura"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" />
                    <div className="col-md-6">
                        <SelectField
                            floatingLabelText="Sexo"
                            value={sex}
                            fullWidth={true}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="M" primaryText="Masculino" />
                            <MenuItem value="F" primaryText="Feminino" />
                        </SelectField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" />
                    <div className="col-md-6">
                        <SelectPatientType changeField={this.onChangePatientType.bind(this)}/>
                    </div>
                </div>
                <RaisedButton type="submit" primary={true}>Submit</RaisedButton>
                </form>
            </div>
        );
    }
}

export default StepperForm;