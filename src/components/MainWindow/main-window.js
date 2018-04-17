import React, {Component} from "react";
import { connect } from "react-redux";
import PatientTable from "./patientTable";
import Logout from "../Logout/logout";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SearchBar from 'material-ui-search-bar';
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom"
import {getPatientList} from "../../utils/communication-manager";
import "../../styles/pacientes_style.css";




class MainWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
            patientList: undefined,
            term: '',
        }

    }



    MainActivity = () => {
        let props = {
            list:this.state.patientList,
            term:this.state.term,
        }
        var role = this.props.role;

        if (this.props.auth === true && this.state.patientList !== undefined) {
            return (
                <div className="row content-middle-page">
                    <div className="row ">
                        <div className="doctorName">
                            <p className="doctorNameLabel">Olá {role}</p>
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
                        <div className="col-md-8">
                            <PatientTable {...props}/>
                        </div>
                        <div className="col-md-2 content-center btn-to-middle">
                            <Link to="/patient">
                                <FloatingActionButton style={{marginRight: 20}}>
                                    <ContentAdd />
                                </FloatingActionButton>
                            </Link>
                            <h3>Adicionar Paciente</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.props.auth === false) {
            return (
                <Logout/>
            )
        }
    }

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



    patientList(token, role){
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


export default connect(mapStateToProps, null)(MainWindow);

