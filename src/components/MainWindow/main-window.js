import React, {Component} from 'react';
import store from '../../store/store';


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
        const { authentication } = store.getState();
        if(authentication['isLoggedIn'] === true)
        {
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

