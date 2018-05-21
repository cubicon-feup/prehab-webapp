import React, {Component} from "react";
import { connect } from "react-redux";
import PatientTable from "./patientTable";
import PatientInfo from "./patientInfo";
import { Link } from "react-router-dom"
import {getPatientList} from "../../utils/communication-manager";
import "../../styles/patients_style.css";
import Patients from "../../images/icons/patients.svg";



class Patient extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            patientSelected: false,
            patientInfo: undefined,
            patientList: undefined,
            term: '',
        }

    }

    handler(patientInfo) {
            console.log("HANDELEs");
            console.log(patientInfo);
            this.setState({
                patientSelected: true,
                patientInfo: patientInfo
            })
        }

    MainActivity = () => {
        let myStyle = {
		    marginTop: '90px'
	    };
        let data = {
            list:this.state.patientList,
            term:this.state.term,
            token: this.props.token,
        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.patientList !== undefined) {
            if(!this.state.patientSelected){
                return (
                    <div className="row">
                        <div className="row ">
                            <div className="doctorName col-md-5">
                                <img src={Patients} alt="dashboard" className="doctorsImg " />
                            </div>
                            <div className="doctorName col-md-7">
                                <p className="titleLabel">Pacientes</p>
                            </div>
                            <div className = "searchBarDiv">
                                <input className = "searchBar"
                                    placeholder = "Pesquisar"
                                    value = {this.state.term}
                                    onChange = {this.filterList.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 text-left">
                                <PatientTable action={this.handler.bind(this)} {...data}/>
                            </div>
                            <div className="col-md-3 text-right " style={myStyle}>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <Link to="/newPatient" style={{textDecoration: 'none' }}>
                                            <div className="botaoMais">+</div>
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
            } else{
                return(
                <PatientInfo info={this.state.patientInfo} />
                );
            }
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
        this.setState({
            patientSelected : false
        });

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


const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role

    };
};


export default connect(mapStateToProps, null)(Patient);
