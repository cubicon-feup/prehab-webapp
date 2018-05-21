import React, {Component} from "react";
import { connect } from "react-redux";
import TaskTable from "./taskTable";
import { Link } from "react-router-dom";
import "../../styles/patients_style.css";
import {getDoctorPlan} from "../../utils/communication-manager";
import Tasks from "../../images/icons/tasks.svg";

class Plan extends Component {

    constructor(props){
        super(props);
        this.state = {
            patientList: undefined,
            term: '',
        }

    }

    MainActivity = () => {
        let myStyle = {
		    marginTop: '90px'
	    };
        let props = {
            list:this.state.taskList,
            term:this.state.term,
        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.taskList !== undefined) {
            return (
                <div className="row">
                    <div className="row ">
                        <div className="doctorName col-md-5">
                            <img src={Tasks} alt="dashboard" className="doctorsImg " />
                        </div>
                        <div className="doctorName col-md-7">
                            <p className="titleLabel">Planos</p>
                        </div>
                        <div className = "searchBarDiv">
                            <input className = "searchBar"
                                placeholder = "Pesquisar"
                                value = {this.state.term}
                                onChange = {this.taskList.bind(this)}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 text-left">
                            <TaskTable {...props}/>
                        </div>
                        <div className="col-md-3 text-right " style={myStyle}>
                            <div className="row">
                                <div className="col-md-12 text-center">
	                                <Link to="/newPlan" style={{textDecoration: 'none' }}>
		                                <div style={divAddPatientStyle}>+</div>
	                                </Link>
                                </div>
                            </div>
	                        <div className="row">
		                        <div className="col-md-12 text-center">
			                        <p className="addPatientLabel">Adicionar Plano</p>
		                        </div>
	                        </div>

                            {this.settingsMenu()}
                        </div>
                    </div>
                </div>
            )
        }

        else if(this.props.auth === false) {

            return (
              <h1> </h1>
            )
        }
    };

    settingsMenu = () => {
        console.log(this.props.role);

        if  (this.props.auth === true && this.props.role === "Admin") {
            return (
                <div className="patients">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Link to="/task" style={{textDecoration: 'none' }}>
                                <div style={divAddPatientStyle}>+</div>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className="addPatientLabel">Adicionar Tarefa</p>
                        </div>
                    </div>   
                </div>     
            );
        } else{
            return null
        }
    }


    componentDidMount() {
        //console.log(this.props.token);
        this.taskList(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
	    this.taskList(nextProps.token);
    }

	taskList(token){
		getDoctorPlan(token).then(list => {
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



    render() {
        return (
            <div >
                {this.MainActivity()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role

    };
};


export default connect(mapStateToProps, null)(Plan);

const divAddPatientStyle = {
    backgroundColor:"#F1F9FF",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:100,
    cursor: "pointer",
    display:"table",
    margin: "auto",
    fontSize:20,
    width: 50,
    height: 50,
};