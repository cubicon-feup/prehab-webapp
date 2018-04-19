import React, {Component} from "react";
import PlanForm from "./planForm"
import {connect} from "react-redux";
import {getTaskList} from "../../utils/communication-manager";
import Logout from "../Logout/logout";

class Plan extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskList: undefined
        }

    }

    createActivityPlan = () => {
        if(this.props.auth === true && this.state.taskList !== undefined) {
            return (
                <div className="row">
                    <PlanForm list={this.state.taskList}/>
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
    componentDidMount() {
        console.log(this.props.token);
        getTaskList(this.props.token).then(list => {
            console.log(list);
            this.setState({
                taskList: list.data
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                taskList: undefined
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.taskList === undefined && nextProps.auth) {
            this.createActivityPlan();
        }
    }



    render() {
        return (
            <div >
                {this.createActivityPlan()}
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

export default connect(mapStateToProps, null)(Plan);