import React, {Component} from "react";
import { connect } from "react-redux";
import {compose} from 'redux';
import DoctorTable from "./doctorTable";
import DoctorInfo from "./doctorInfo";
//import SearchBar from 'material-ui-search-bar';
import { Link } from "react-router-dom"
import {getDoctorList} from "../../utils/communication-manager";
import "../../styles/settings_style.css";
import Doctors from "../../images/icons/doctors.svg";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    fabGreen: {
        position: 'fixed',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 2,
        backgroundColor:'green',
      }
});

const newDoctor = props => <Link to="/newDoctor" {...props} />

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
        let data = {
            list:this.state.doctorList,
            term:this.state.term,
            token: this.props.token,
        };

        const { classes} = this.props;
        if (this.props.auth === true && this.state.doctorList !== undefined) {
        console.log("DS:" + this.state.doctorSelected);
        if(!this.state.doctorSelected){
            return (
                <Grid container spacing={32}>
                    <Grid item md={11} xs={12}>
                        <DoctorTable action={this.handler.bind(this)} {...data} />
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <Tooltip id="tooltip-fab"title="Criar Médico">
                            <Button variant="fab" color="primary" aria-label="add" component={newDoctor} className={classes.fab}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            );
            } else{

                return(
                    <DoctorInfo info={this.state.doctorInfo} />
                );
            }
        }

        else if(this.props.auth === false) {

            return (
                ""
            )
        }
    };


    componentWillReceiveProps(nextProps) {
        this.doctorList(nextProps.token);
        this.setState({
            doctorSelected : false
        });
        this.setState({term: nextProps.filter});

    }

    componentDidMount() {
        this.doctorList(this.props.token);
        this.props.setTitle('Médicos');
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

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,null))(Settings);
