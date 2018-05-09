import React, { Component } from 'react';
import RaisedButton from "material-ui/RaisedButton";
import { logOut } from "../../actions/authActions";
import { connect } from 'react-redux';

class ButtonLogout extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit = (e) => {

    sessionStorage.clear();
      this.props.logOut();

      this.props.history.push("/logout");

        };




    render(){

        return(

          <RaisedButton label="Sair" primary={true} onClick={this.onSubmit} />

          )
    }
  }
  const mapStateToProps = (state) => {
      return {
          auth: state.auth.loggedOut
      };
  };
  function mapDispatchToProps(dispatch) {
  	return {

  		logOut: () => {
  			dispatch(logOut());

  		}
  	};
  }


  export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogout);
