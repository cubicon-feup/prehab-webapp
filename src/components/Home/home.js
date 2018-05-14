import React, {Component} from 'react';
import logo from '../../images/logo.png';
import TextField from 'material-ui/TextField';
import validateInput from '../../validation/login';
import { connect } from 'react-redux';
import {logOut, signIn} from "../../actions/authActions";
import { Link } from 'react-router-dom'
import {wrongCredentials} from "../Login/login";
import {authenticateUser} from "../../utils/communication-manager";

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			errors: {},
			message: '',
			role: 'doctor'
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	onChange = (e) => {
		e.preventDefault();
		this.setState( { [e.target.name]: e.target.value} )
	};

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid){
			this.setState({ errors });
		}
		return isValid;
	}

	_handleKeyPress = (e) => {
		if (e.key === 'Enter') {
		  this.onSubmit(e);
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		if(this.isValid()){
			this.setState({ errors: {} });
			authenticateUser(this.state.username, this.state.password)
				.then(suc => {
					this.props.signIn(suc.data.jwt, suc.data.role);
					this.props.history.push("/main");
				})
				.catch(err => {
					const { errors } = wrongCredentials();
					this.setState({ errors });
					console.log("err:" + err);
					this.props.logOut();
				});
		}
	};

	render() {
		const { errors, username, password } = this.state;
		if(this.props.auth === true ) {
			this.props.history.push("/main");
			return null
		 }else{
			 return(
				<div className="row">
					<div className="content-center " style={{color: " #7AC4FF", width:'700px'}} >
						<img src={logo} width="150px" alt="Amazing"  style={{ marginTop:100}}/>
						<p> </p>
						<p>Bem-vindo ao Prehab </p>
						<p>Monitorização e controlo da condição de saúde de pacientes numa fase pre-operatório</p>
						<p> {this.state.message} </p>
						<div className="content-center" style={{width:'600px'}}>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<TextField
										name="username"
										value={username}
										fullWidth="true"
										errorText={errors.username}
										onChange={this.onChange}
										onKeyPress={this._handleKeyPress}
										hintText="Inserir Nome de Utilizador"
									/>
									<TextField
										inputStyle={inputStyle}
										name="password"
										fullWidth="true"
										type="password"
										value={password}
										onKeyPress={this._handleKeyPress}
										onChange={this.onChange}
										errorText={errors.password}
										hintText="Inserir Password"
									/>

									<p> </p>
									<div style={divStyle}
										onClick={this.onSubmit}>
										Entrar
									</div>
								</div>
							</form>
							<Link to="/forgetPassword" style={{color: '#7AC4FF'}} activeStyle={{color: 'red'}}>Esqueceu-se da Password?</Link>
						</div>
					</div>
				</div>
			)
		 }
	}
}

const divStyle = {
	borderColor: '#BCE0FD',
	borderWidth: 1,
	borderStyle:"solid",
	paddingTop:5,
	paddingBottom:5,
	paddingLeft:20,
	paddingRight:20,
	borderRadius:100,
	cursor: "pointer",
	display:"table",
	margin: "auto",
  };


const inputStyle = {

  };

const mapStateToProps = (state) => {
	return {
		auth: state.auth.isLoggedIn
	};
};

function mapDispatchToProps(dispatch) {
	return {
		signIn: (username, password, role) =>{
			dispatch(signIn(username, password, role));
		},
		logOut: () => {
			dispatch(logOut());
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
