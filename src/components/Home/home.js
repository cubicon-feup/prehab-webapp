import React, {Component} from 'react';
import logo from '../../images/logo.svg';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Home extends Component {

    handleClick = () => {
        this.props.history.push("/login");
    };

	render() {
		return (
			<div class="row">
                <div class="content-center ">
                    <img src={logo}  width="500px" alt="Amazing"/>
                    <p>This is our Landing Page</p>
                    <RaisedButton label="Login" primary={true} onClick={this.handleClick} />
                </div>
            </div>
		);
	}
}

export default Home;