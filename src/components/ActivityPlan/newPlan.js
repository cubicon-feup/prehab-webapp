import React, {Component} from "react";
import PlanForm from "./planForm"
import {connect} from "react-redux";
import {getTaskList} from "../../utils/communication-manager";
import RaisedButton from "material-ui/RaisedButton";


class NewPlan extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskList: undefined,
            step_value: 1
        }

    }

    create2Stepper = () =>{
        this.setState({ step_value: 2});
    };

    create4Stepper = () =>{
        this.setState({ step_value: 4});
    };

    createActivityPlan = () => {
        if(this.props.auth === true && this.state.taskList !== undefined) {
            if(this.state.step_value === 1){
                return (
                    <div className="content-middle-page col-md-8">
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Selecionar o tempo do plano</h3>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <RaisedButton primary={true} onClick={this.create2Stepper} label="2 Semanas" />                                
                            </div>                            
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-6">
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
              <h1> </h1>
            )
        }
    };

    componentDidMount() {
        //console.log(this.props.token);
        this.taskList(this.props.token);
        this.props.setTitle('Novo Plano de Tarefas');
    }

    componentWillReceiveProps(nextProps) {
	    this.taskList(nextProps.token);
    }

	taskList(token){
		getTaskList(token).then(list => {
			//console.log(list);
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

export default connect(mapStateToProps, null)(NewPlan);
