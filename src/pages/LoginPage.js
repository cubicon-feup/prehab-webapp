import React, { Component } from 'react';
import logo from '../images/logo.svg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
	render() {
		return (
			<div>
				<img src={logo} width="500px" alt="logo" />
				<br />
				<TextField
					floatingLabelText="Username"
				/><br />
				<TextField
					floatingLabelText="Password"
				/><br />
				<RaisedButton/>
			</div>
		);
	}
}

export default Login;