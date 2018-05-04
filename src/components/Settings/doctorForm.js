import React, {Component} from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "../../styles/newDoctor_style.css";

class DoctorForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            errors: {}
        };

    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.doctorFormSubmit(this.state);
    };

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    };

    render(){
    const { errors, name, email, username, password } = this.state;
        return(

            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row ">
                        <div className="col-md-12">
                            <TextField
                                name="name"
                                value={name}
                                type="name"
                                errorText={errors.name}
                                onChange={this.onChange}
                                hintText="Inserir nome"
                                fullWidth={true}
                                className="formInput"
                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12">
                            <TextField
                                name="email"
                                value={email}
                                type="email"
                                errorText={errors.email}
                                onChange={this.onChange}
                                hintText="Inserir email"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12">
                            <TextField
                                name="username"
                                value={username}
                                type="username"
                                errorText={errors.username}
                                onChange={this.onChange}
                                hintText="Inserir username"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12">
                            <TextField
                                name="password"
                                value={password}
                                type="password"
                                errorText={errors.password}
                                onChange={this.onChange}
                                hintText="Inserir password"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                <div className="other-content-center">
                    <RaisedButton type="submit" primary={true} label="Criar"/>
                </div>
                </form>
            </div>
        );
    }
}

export default DoctorForm