import React, {Component} from "react";
import { connect } from "react-redux";
import PatientTable from "./patientTable";
import Logout from "../Logout/logout";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom"
import {getPatientList} from "../../utils/communication-manager";
import "../../styles/pacientes_style.css";


class MainWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
            patientList: undefined
        }
    }



    MainActivity = () => {
        if (this.props.auth === true && this.state.patientList !== undefined) {
            return (
                <div className="row content-middle-page">
                    <div className="row ">
                        <div className="doctorName">
                            <p className="doctorNameLabel">Olá Doctor</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <PatientTable list={this.state.patientList}/>
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
        else {
            return (
                <Logout/>
            )
        }
    }


	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}

	componentDidMount() {
            console.log(this.props.token);
            getPatientList(this.props.token).then(list => {
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
        token : state.auth.accessToken
    };
};


export default connect(mapStateToProps, null)(MainWindow);

