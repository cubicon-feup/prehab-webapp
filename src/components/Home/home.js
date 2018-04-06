import React, {Component} from "react";
import logo from "../../images/logo.svg";
// import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";


class Home extends Component {
    constructor(props) {
        super(props)
    
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () => {
        this.props.history.push("/login");
    };

    componentDidMount() {
        console.log(this.props.authentication)
	}

	render() {
		return (
			<div className="row">
                <div className="content-center ">
                    <img src={logo}  width="500px" alt="Amazing"/>
                    <p>This is our Landing Page</p>
                    <RaisedButton label="Login" primary={true} onClick={this.handleClick} />
                </div>
            </div>
		);
	}
}

export default Home;