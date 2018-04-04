import React, {Component} from 'react';
import TaskForm from './taskForm'
import {connect} from "react-redux";
import Logout from "../Logout/logout";


function CreateActivityTask(props) {

    console.log(props);

    if(props.auth === true) {
        return (
            <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4">
                    <h1>Criar Task</h1>
                    <TaskForm />
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
}


class Task extends Component {

    render() {
        return (
            <div >
                <CreateActivityTask auth={this.props.auth}/>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, null)(Task);


