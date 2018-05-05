import React, {Component} from "react";
import { connect } from "react-redux";
import DoctorTable from "./doctorTable";
import DoctorInfo from "./doctorInfo";
import Logout from "../Logout/logout";
import FloatingActionButton from "material-ui/FloatingActionButton";
//import SearchBar from 'material-ui-search-bar';
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom"
import {getDoctorList} from "../../utils/communication-manager";
import "../../styles/pacientes_style.css";


class Settings extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            doctorInfo: undefined,
            doctorSelected: false,
            doctorList: undefined,
            term: '',
        }

    }

    handler(doctorInfo) {
        console.log("HANDELEs");
        console.log(doctorInfo);
        this.setState({
            doctorSelected: true,
            doctorInfo: doctorInfo
        })
    }

    MainActivity = () => {
        let myStyle = {
		    marginTop: '15%'
	    };
        let props = {
            list:this.state.doctorList,
            term:this.state.term,
            token: this.props.token,

        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.doctorList !== undefined) {
        console.log("DS:" + this.state.doctorSelected);
        if(!this.state.doctorSelected){
            return (
                <div className="row">
                    <div className="row ">
                        <div className="doctorName col-md-4">
                            <p className="doctorNameLabel">Olá {role}</p>
                        </div>
                        <div className = "searchBarDiv col-md-8 text-right">
                            <input className = "searchBar"
                                placeholder = "Pesquisar"
                                value = {this.state.term}
                                onChange = {this.filterList.bind(this)}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 text-left">
                            <DoctorTable action={this.handler.bind(this)} {...props} />
                        </div>
                        <div className="col-md-3 text-right " style={myStyle}>
                            <div className="row">
                                <div className="col-md-12 text-center">
	                                <Link to="/newDoctor">
		                                <FloatingActionButton style={{marginRight: 20}}>
			                                <ContentAdd />
		                                </FloatingActionButton>
	                                </Link>
                                </div>
                            </div>
	                        <div className="row">
		                        <div className="col-md-12 text-center">
			                        <h3>Adicionar Médico</h3>
		                        </div>
	                        </div>
	                        <div className="row">
                                <div className="col-md-12 text-center">
                                    <Link to="/nutrition">
                                        <FloatingActionButton style={{marginRight: 20}}>
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3>Nutrição</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
            } else{

                return(
                    <DoctorInfo info={this.state.doctorInfo} />
                );
            }
        }

        else if(this.props.auth === false) {

            return (
                <Logout/>
            )
        }
    };


    filterList (event) {
        this.setState({term: event.target.value});
    }


    componentWillReceiveProps(nextProps) {
        this.doctorList(nextProps.token);
        this.setState({
            doctorSelected : false
        });

    }

    componentDidMount() {
        this.doctorList(this.props.token);

    }


	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}




    doctorList(token){
        getDoctorList(token).then(list => {
            console.log(list);
            this.setState({
                doctorList: list.data
            });

        }).catch(err => {
            console.log(err);
            this.setState({
                doctorList: undefined
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


export default connect(mapStateToProps, null)(Settings);
