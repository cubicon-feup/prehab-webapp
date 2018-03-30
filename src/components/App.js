import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
					{
						this.props.children !== null &&
						React.cloneElement(this.props.children, this.props)
					}
				</div>
      </MuiThemeProvider>
    );
  }
}

export default App;