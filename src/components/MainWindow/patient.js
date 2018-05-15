import React, {Component} from "react";
import { connect } from "react-redux";
import PatientTable from "./patientTable";
import { Link } from "react-router-dom"
import {getPatientList} from "../../utils/communication-manager";
import "../../styles/pacientes_style.css";



class Patient extends Component {

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
            list:this.state.patientList,
            term:this.state.term,
        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.patientList !== undefined) {
            return (
                <div className="row">
                    <div className="row ">
                        <div className="doctorName col-md-12">
                            <p className="doctorNameLabel">Olá Doutora Maria Santos{role}</p>
                        </div>
                        <div className = "searchBarDiv col-md-5 text-right">
                            <input className = "searchBar"
                                placeholder = "Pesquisar"
                                value = {this.state.term}
                                onChange = {this.filterList.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 text-left">
                            <PatientTable {...props}/>
                        </div>
                        <div className="col-md-3 text-right " style={myStyle}>
                            <div className="row">
                                <div className="col-md-12 text-center">
	                                <Link to="/newPatient" style={{textDecoration: 'none' }}>
		                                <div style={divAddPatientStyle}>+</div>
	                                </Link>
                                </div>
                            </div>
	                        <div className="row">
		                        <div className="col-md-12 text-center">
			                        <p className="addPatientLabel">Novo Paciente</p>
		                        </div>
	                        </div>

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


    filterList (event) {
        this.setState({term: event.target.value});
    }


    componentWillReceiveProps(nextProps) {
        this.patientList(nextProps.token);

    }

    componentDidMount() {
        this.patientList(this.props.token);
    }


	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}


    patientList(token){
        getPatientList(token).then(list => {
                    console.log(list);
                    this.setState({
                        patientList: list.data
                    });

                }).catch(err => {
                    console.log(err);
                    this.setState({
                        patientList: undefined
                    });
                });
    }
}

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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role

    };
};


export default connect(mapStateToProps, null)(Patient);
