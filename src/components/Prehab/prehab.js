import React, {Component} from "react";
import { connect } from "react-redux";
import PrehabTable from "./prehabTable";
import Logout from "../Logout/logout";
import {getPrehabList} from "../../utils/communication-manager";
import "../../styles/patients_style.css";



class Prehab extends Component {

    constructor(props){
        super(props);
        this.state = {

            prehabList: undefined,
            term: '',
        }

    }

    MainActivity = () => {
        let myStyle = {
		    marginTop: '90px'
	    };
        let props = {
            list:this.state.prehabList,
            term:this.state.term,
        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.prehabList !== undefined) {
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
                            <PrehabTable {...props}/>
                        </div>
                        <div className="col-md-3 text-right" style={myStyle}>

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
    };


    filterList (event) {
        this.setState({term: event.target.value});
    }


    componentWillReceiveProps(nextProps) {
        this.prehabList(nextProps.token);

    }

    componentDidMount() {
        this.prehabList(this.props.token);
    }


	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}




    prehabList(token){
        getPrehabList(token).then(list => {
                    console.log(list);
                    this.setState({
                        prehabList: list.data
                    });

                }).catch(err => {
                    console.log(err);
                    this.setState({
                        prehabList: undefined

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


export default connect(mapStateToProps, null)(Prehab);
