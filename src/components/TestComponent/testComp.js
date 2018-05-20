import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import DetailList from "../Prehab/Plano/detailList";

import {getPrehabTasks} from "../../utils/communication-manager";
import {chunkArray, groupweek} from "../../utils/helper";

import { connect } from "react-redux";


class TestComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            dialogState: false,
            number_of_weeks: 0,
            tabDates: [],
            tabContent: undefined,
        }
    }

    openDialog = () => {
        this.setState({
            dialogState: true,
        });
    }

    closeDialog = () =>{
        this.setState({
            dialogState: false,
        })
    }

    sortDate(a, b) {
        return new Date(a).getTime() - new Date(b).getTime();
    }

    getPrehabTask = () => {
        getPrehabTasks(this.props.token, 29)
            .then(suc => {
                //console.log(suc);
                const orderedSchedule = {};
                const unorderedSchedule = suc.data.task_schedule;
                //console.log(suc.data.task_schedule);
                Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
                    orderedSchedule[key] = unorderedSchedule[key];
                });
                console.log(orderedSchedule);
                this.setState({
                    number_of_weeks: suc.data.number_of_weeks
                });
                let myDates = [];

                Object.entries(suc.data.task_schedule).forEach((exercises, i) => { 
                    //myDates[i] = Object.keys(orderedSchedule)[i];
                    myDates.push( Object.keys(orderedSchedule)[i] );
                    
                });

                
                console.log(myDates);
                console.log("groupweek");
                console.log(groupweek(myDates));

                let newArray = chunkArray(myDates, ( myDates.length / this.state.number_of_weeks));

                this.setState({
                    tabDates: newArray,
                    tabContent: suc.data.task_schedule
                });

                //console.log(newArray);

                console.log(this.state);

            })
            .catch(err => {
                console.log(err);
            });
    };

	render() {

		return (
            <div className="row ">
                <div className="col-md-12">
                    <RaisedButton primary={true} onClick={this.getPrehabTask} style={{marginBottom: '30px'}}>
                        My Detailed List
                    </RaisedButton>
                </div>
                <div className="col-md-12">
                    <DetailList number_of_weeks={this.state.number_of_weeks} tabDates={this.state.tabDates} tabContent={this.state.tabContent}/>

                </div>
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


export default connect(mapStateToProps, null)(TestComponent);