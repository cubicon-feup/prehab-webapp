import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateAuthInfo, authenticate } from '../../utils/authentication';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    }

    onSubmit = (e) => {
        e.preventDefault();
        //We need to add API request and response
        authenticate(this.state.username);
        this.props.history.push('/main');
    }

    componentDidMount() {
		updateAuthInfo();
	}


    render() {
        return (
            <div className="row content-middle-page">
                <div className="content-center">
                    <form onSubmit={this.onSubmit}>
                    <h1> Hi Doctor! </h1>

                    <div className="form-group">
                        <TextField
                            name="username"   
                            value={this.state.username} 
                            onChange={this.onChange}               
                            hintText="Insert Username"
                        />
                        <TextField
                            name="password"
                            onChange={this.onChange}  
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