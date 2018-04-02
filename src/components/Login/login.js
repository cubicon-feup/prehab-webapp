import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validateInput from '../../validation/login';
import { connect } from 'react-redux';
import { logIn } from "../../actions/authActions";
import store from "../../store";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            message: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.isValid()){
            this.setState({ errors: {} });
            this.props.logIn(this.state.username, this.state.password);
            store.subscribe( () => {
                if(this.props.auth === true)
                    this.props.history.push('/main');
            });


        }
    }


    render() {
        const { errors, username, password } = this.state;
        return (
            <div className="row content-middle-page">
                <p> {this.state.message} </p>
                <div className="content-center">
                    <form onSubmit={this.onSubmit}>
                        <h1> Hi Doctor! </h1>
                        <div className="form-group">
                            <TextField
                                name="username"   
                                value={username} 
                                errorText={errors.username}
                                onChange={this.onChange}               
                                hintText="Insert Username"
                            />
                            <TextField
                                name="password"
                                value={password}
                                onChange={this.onChange} 
                                errorText={errors.password} 
                                hintText="Insert Password"
                            />
                            <RaisedButton label="Login" primary={true} onClick={this.onSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn
    };
};

function mapDispatchToProps(dispatch) {
    return {
        logIn: (username, password) =>{
            dispatch(logIn(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

