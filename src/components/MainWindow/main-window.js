import React, {Component} from 'react';
import { connect } from 'react-redux';


class MainWindow extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          Message: 'Login Failed',
        }
      }

    componentDidMount()
    {
        console.log("Props");
        console.log(this.props);
        if(this.props.auth === true)
        {
            this.setState({
                Message: "Login Success"
            });
        }

    }

	render() {
		return (
            <div>
                <h1>{this.state.Message}</h1>
            </div>
		);
	}
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn
    };
};



export default connect(mapStateToProps, null)(MainWindow);

