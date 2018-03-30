import React, {Component} from 'react';


class MainWindow extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          Message: '',
        }
      }
    componentWillMount() {
          this.renderContent();
      }

    renderContent = () => {
        console.log(this.props.authentication)
        if (this.props.authentication) {
            this.setState({ Message: 'Login Success' });
        } else {
            this.setState({ Message: 'Login Failed' });

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

export default MainWindow;

