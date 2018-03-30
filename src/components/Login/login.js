import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateAuthInfo, authenticate, logout } from '../../utils/authentication';
import validateInput from '../../validation/login';
import { connect } from 'react-redux';
import { login } from '../../actions/actions';
import store from '../../store/store';


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
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
            //console.log(errors);
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.isValid()){
            this.setState({ errors: {} });
            //Trying API request and response
            authenticate(this.state.username);
            const { authentication } = store.getState();

            if(authentication['isLoggedIn'] === true)
            {
                console.log("Valid");
                this.props.history.push('/main');
            }
        }
    }

    logout = (e) => {
        e.preventDefault();
        logout();
    }

    componentDidMount() {
        updateAuthInfo();
        console.log(this.props.authentication)

	}


    render() {
        const { errors, username, password } = this.state;
        return (
            <div className="row content-middle-page">
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


export default Login;