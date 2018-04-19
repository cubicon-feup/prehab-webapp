import React, {Component} from "react";
import TaskForm from "./taskForm"
import {connect} from "react-redux";
import Logout from "../Logout/logout";


class Task extends Component {

    CreateACtivityTask = () => {
        if(this.props.auth === true) {
            return (
                <div className="row">
                    <div className="col-md-4" />
                    <div className="col-md-4">
                        <h1>Criar Task</h1>
                        <TaskForm token={this.props.token}/>
                    </div>
                    <div className="col-md-4" />
                </div>
            )
        }
        else
        {
            return (
                <Logout />
            )
        }
    };

    render() {
        return (
            <div >
                {this.CreateACtivityTask()}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token: state.auth.accessToken
    };
};

export default connect(mapStateToProps, null)(Task);


