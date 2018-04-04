import React, {Component} from 'react';
import { connect } from 'react-redux';
import PatientTable from './PatientTable';
import Logout from "../Logout/logout";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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
                            <h1>Olá Doctor</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <PatientTable/>
                        </div>
                        <div className="col-md-2 content-center btn-to-middle">
                            <FloatingActionButton style={{marginRight: 20}}>
                                <ContentAdd />
                            </FloatingActionButton>
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
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn
    };
};


export default connect(mapStateToProps, null)(MainWindow);

