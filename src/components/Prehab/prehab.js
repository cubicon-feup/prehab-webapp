import React, {Component} from "react";
import {compose} from 'redux';
import { connect } from "react-redux";
import PrehabTable from "./prehabTable";
import PrehabInfo from "./prehabInfo";
import { Link } from "react-router-dom";
import {getPrehabList} from "../../utils/communication-manager";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {chunkArray} from "../../utils/helper";
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
  });

const newPrehab = props => <Link to="/newPrehab" {...props} />
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
            planContent: undefined,
            mealContent: undefined
        }

    }
    componentDidMount() {
        this.props.setTitle('Prehabs');
        this.prehabList(this.props.token);
    }

    sortDate(a, b) {
        return new Date(a).getTime() - new Date(b).getTime();
    }

    handler(prehabInfo) {
        let myDates = [];
        const orderedSchedule = {};
        const orderedMeal = {};
        let unorderedSchedule = prehabInfo.data.task_schedule;
        Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
            orderedSchedule[key] = unorderedSchedule[key];
        });

        unorderedSchedule = prehabInfo.data.meal_schedule;
        Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
            orderedMeal[key] = unorderedSchedule[key];
        });
        Object.entries(prehabInfo.data.task_schedule).forEach((exercises, i) => { 
            myDates.push( Object.keys(orderedSchedule)[i] );
        });        
        let tabDatesArray = chunkArray(myDates, ( myDates.length / prehabInfo.data.number_of_weeks));
        //let tabContentArray = chunkArray(orderedSchedule, ( orderedSchedule.length / prehabInfo.data.number_of_weeks));
        this.setState({
            number_of_weeks: prehabInfo.data.number_of_weeks,
            tabDates: tabDatesArray,
            planContent: orderedSchedule,
            mealContent: orderedMeal,
            prehabSelected: true,
            prehabInfo: prehabInfo
        });
    }

    MainActivity = () => {
        const { classes} = this.props;
        let data = {
            list:this.state.prehabList,
            term:this.state.term,
            token: this.props.token,
        };


        if (this.props.auth === true && this.state.prehabList !== undefined) {
            if(!this.state.prehabSelected){
                return (
                    <Grid container spacing={32}>
                        <Grid item md={11} xs={12}>
                            <PrehabTable action={this.handler.bind(this)} {...data}/>
                        </Grid>
                        <Grid item md={1} xs={12}>
                            <Tooltip id="tooltip-fab" title="Criar Prehabs">
                                <Button variant="fab" color="primary" aria-label="add" component={newPrehab} className={classes.fab}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                )
            } else{
                return(
                    <PrehabInfo 
                        info={this.state.prehabInfo} 
                        token={this.props.token} 
                        number_of_weeks={this.state.number_of_weeks} 
                        tabDates={this.state.tabDates} 
                        planContent={this.state.planContent}
                        mealContent={this.state.mealContent}
                        />
                );
            }
        }

        else if(this.props.auth === false) {
            return (
                <Redirect to='/'/>
            )
        }
    };

    componentWillReceiveProps(nextProps) {
        this.prehabList(nextProps.token);
        this.setState({
            prehabSelected : false
        });
        this.setState({term:nextProps.filter});
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

Prehab.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,null))(Prehab);
