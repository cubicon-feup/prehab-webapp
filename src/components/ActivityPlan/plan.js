import React, {Component} from "react";
import PlanForm from "./planForm"
import {connect} from "react-redux";
import {getTaskList} from "../../utils/communication-manager";
import Logout from "../Logout/logout";
import RaisedButton from "material-ui/RaisedButton";


class Plan extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskList: undefined,
            step_value: 1
        }

    }

    create2Stepper = () =>{
        this.setState({ step_value: 2});
    }

    create4Stepper = () =>{
        this.setState({ step_value: 4});
    }

    createActivityPlan = () => {
        if(this.props.auth === true && this.state.taskList !== undefined) {
            if(this.state.step_value === 1){
                return (
                    <div>
                        <br />
                        <div className="row">
                            <div className="col-md-6 offset-md-4">
                                <h1>Selecionar tempo do plano</h1>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6 offset-md-6">
                                <RaisedButton primary={true} onClick={this.create2Stepper} label="2 Semanas" />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6 offset-md-6">
                                <RaisedButton primary={true} onClick={this.create4Stepper} label="4 Semanas" />
                            </div>
                        </div>
                    </div>
                )
            }
            else
            {
                return(
                    <div>
                        <PlanForm steps={this.state.step_value} token={this.props.token} list={this.state.taskList}/>
                    </div>
                )
            }
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
