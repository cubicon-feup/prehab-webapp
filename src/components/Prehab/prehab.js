import React, {Component} from "react";
import { connect } from "react-redux";
import PrehabTable from "./prehabTable";
import PrehabInfo from "./prehabInfo";
import { Link } from "react-router-dom";
import {getPrehabList} from "../../utils/communication-manager";
import "../../styles/prehabs_style.css";


import {chunkArray} from "../../utils/helper";

class Prehab extends Component {

    constructor(props){
        super(props);
        this.state = {
            prehabSelected: false,
            prehabInfo: undefined,
            prehabList: undefined,
            term: '',
            number_of_weeks: 0,
            tabDates: [],
            tabContent: undefined,

        }

    }

    sortDate(a, b) {
        return new Date(a).getTime() - new Date(b).getTime();
    }

    handler(prehabInfo) {
        let myDates = [];
        const orderedSchedule = {};
        const unorderedSchedule = prehabInfo.data.task_schedule;
        Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
            orderedSchedule[key] = unorderedSchedule[key];
        });
        Object.entries(prehabInfo.data.task_schedule).forEach((exercises, i) => { 
            myDates.push( Object.keys(orderedSchedule)[i] );
        });        
        let tabDatesArray = chunkArray(myDates, ( myDates.length / prehabInfo.data.number_of_weeks));
        //let tabContentArray = chunkArray(orderedSchedule, ( orderedSchedule.length / prehabInfo.data.number_of_weeks));
        this.setState({
            number_of_weeks: prehabInfo.data.number_of_weeks,
            tabDates: tabDatesArray,
            tabContent: orderedSchedule,
            prehabSelected: true,
            prehabInfo: prehabInfo
        });
    }

    MainActivity = () => {

        let data = {
            list:this.state.prehabList,
            term:this.state.term,
            token: this.props.token,
        };
        let role = this.props.role;

        if (this.props.auth === true && this.state.prehabList !== undefined) {
            if(!this.state.prehabSelected){
                return (
                    <div className="row">
                        <div className="row ">
                            <div className="doctorName col-md-12">
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
                            <div className="col-md-9 text-left">
                                    <PrehabTable action={this.handler.bind(this)} {...data}/>
                            </div>
                            <div className="col-md-3 text-right " style={{marginTop: '90px'}}>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <Link to="/newPrehab" style={{textDecoration: 'none' }} {...data}>
                                            <div className="botaoMais">+</div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                            <p className="addPatientLabel">Criar Prehab</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else{
                return(
                    <PrehabInfo info={this.state.prehabInfo} token={this.props.token} number_of_weeks={this.state.number_of_weeks} tabDates={this.state.tabDates} tabContent={this.state.tabContent}/>
                );
            }
        }

        else if(this.props.auth === false) {
            return (
                ""
            )
        }
    };


    filterList (event) {
        this.setState({term: event.target.value});
    }


    componentWillReceiveProps(nextProps) {
        this.prehabList(nextProps.token);
        this.setState({
            prehabSelected : false
        });

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
        console.log(token);
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
