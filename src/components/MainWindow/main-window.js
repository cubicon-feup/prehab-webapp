import React, {Component} from 'react';
import { connect } from 'react-redux';
import PatientTable from './PatientTable';
import RaisedButton from 'material-ui/RaisedButton';
import Logout from "../Logout/logout";


class MainWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
            patientList: undefined
        }
    }



    MainActivity = () => {
        if (this.props.auth === true) {
            return (
                <div className="row content-middle-page">
                    <div className="row ">
                        <div className="content-center">
                            <h1>Login Sucesso</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <PatientTable/>
                        </div>
                        <div className="col-md-2 content-center btn-to-middle">
                            <RaisedButton label="Adicionar Paciente" primary={true}/>
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
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn
    };
};


export default connect(mapStateToProps, null)(MainWindow);

