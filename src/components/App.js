import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div >
					{
						this.props.children 
					}
				</div>
      </MuiThemeProvider>
    );
  }
}

export default App;