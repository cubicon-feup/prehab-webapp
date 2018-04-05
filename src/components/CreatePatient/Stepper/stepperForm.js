import React, {Component} from "react";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SelectPatientType from "./selectPatientType";

class StepperForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            sex: "",
            height: "",
            weight: "",
            age: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    }

    handleChange = (event, index, value) => this.setState({sex: value});

    render() {
        const { errors, email, sex, height, weight, age } = this.state;

        return (
            <div>
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
                            <MenuItem value={1} primaryText="Masculino" />
                            <MenuItem value={2} primaryText="Feminino" />
                        </SelectField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" />
                    <div className="col-md-6">
                        <SelectPatientType/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepperForm;