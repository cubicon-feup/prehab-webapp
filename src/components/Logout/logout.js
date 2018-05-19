import React, { Component } from 'react';
import { logOut } from "../../actions/authActions";
import { connect } from 'react-redux';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon(){
    sessionStorage.clear();
    this.props.logOut();

    if (this.props.history != null) {
      this.props.history.push("/");
    }
  }

    render(){
      return(
        <div className="patient-container">
          {this.renderIcon()}
        </div>
      );
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
