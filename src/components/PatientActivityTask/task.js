import React, {Component} from "react";
import TaskForm from "./taskForm"
import {connect} from "react-redux";
import "../../styles/newTask_style.css";


class Task extends Component {

    CreateACtivityTask = () => {
        if(this.props.auth === true) {
            return (
                <div>
                    <div className="registoLabel">
                        Criar Tarefa
                    </div>
                    <TaskForm token={this.props.token}/>
                </div>
            )
        }
        else
        {
            return (
                ""
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


