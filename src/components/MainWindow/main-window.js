import React, {Component} from 'react';

class MainWindow extends Component {

    renderContent = () => {
        console.log(this.props.authentication)
        if (this.props.authentication) {
          return (
                <div>
                    <h1>Hi Doctor!</h1>
                    <h3>Thank yor for log In!</h3>
                </div>
          );
        } else {
            return (
                <div>
                    <h1>Go Login!</h1>
                </div>
            )
        }
      }

	render() {
		return (
            this.renderContent()
		);
	}
}

export default MainWindow;

