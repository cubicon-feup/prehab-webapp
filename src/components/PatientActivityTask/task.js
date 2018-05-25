import React, {Component} from "react";
import TaskForm from "./taskForm"
import {connect} from "react-redux";


class Task extends Component {
    componentDidMount() {
        this.props.setTitle('Criar Tarefa');
    }
    CreateACtivityTask = () => {
        if(this.props.auth === true) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="content-middle-page">
                            <TaskForm token={this.props.token}/>
                        </div>
                    </div>
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


