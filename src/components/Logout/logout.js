import React, { Component } from 'react';
import {Redirect} from "react-router";
import { logOut } from "../../actions/authActions";
import { connect } from 'react-redux';

class Logout extends Component {

  componentDidMount(){
        sessionStorage.clear();
        this.props.logOut();

    }

    render(){

        return(
          <div>
            <h1>Logging out </h1>
            <Redirect to ="/"/>
          </div>
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


  export default connect(mapStateToProps, mapDispatchToProps)(Logout);
