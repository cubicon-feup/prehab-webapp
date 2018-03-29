import React, {Component} from 'react';
import logo from '../images/logo.svg';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Link from "react-router-dom/es/Link";

class Login extends Component {
	render() {
		return (
			<div>
				<img src={logo} width="500px" alt="logo"/><br/>
				<p>This is our Landing Page</p><br/>
				<Link to={'/login'}> Login Page</Link>
			</div>
		);
	}
}

export default Login;