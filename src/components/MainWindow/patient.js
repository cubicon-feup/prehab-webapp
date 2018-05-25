import React, {Component} from "react";
import {compose} from 'redux';
import { connect } from "react-redux";
import PatientTable from "./patientTable";
import PatientInfo from "./patientInfo";
import { Link } from "react-router-dom"
import {getPatientList} from "../../utils/communication-manager";
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
    }
  });

const newPatient = props => <Link to="/newPatient" {...props} />

class Patient extends Component {
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            patientSelected: false,
            patientInfo: undefined,
            patientList: undefined,
            term: ''
        }

    }

    handler(patientInfo) {
            console.log("HANDELEs");
            console.log(patientInfo);
            this.setState({
                patientSelected: true,
                patientInfo: patientInfo
            })
        }

    MainActivity = () => {
        const { classes} = this.props;
        let data = {
            list:this.state.patientList,
            term:this.state.term,
            token: this.props.token,
        };


        if (this.props.auth === true && this.state.patientList !== undefined) {
            if(!this.state.patientSelected){
                return (
                    <Grid container spacing={32}>
                        <Grid item md={11} xs={12}>
                        <PatientTable action={this.handler.bind(this)} {...data}/>
                        </Grid>
                        <Grid item md={1} xs={12}>
                        <Tooltip id="tooltip-fab" title="Criar Paciente">
                            <Button variant="fab" color="primary" aria-label="add" component={newPatient} className={classes.fab}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                        </Grid>
                    </Grid>
                    
                )
            } else{
                return(
                <PatientInfo info={this.state.patientInfo} />
                );
            }
        }

        else if(this.props.auth === false) {

            return (
                <h1> </h1>
            )
        }
    };


    componentWillReceiveProps(nextProps) {
        this.patientList(nextProps.token);
        this.setState({
            patientSelected : false
        });
        this.setState({term: nextProps.filter});

    }

    componentDidMount() {
        this.patientList(this.props.token);
        this.props.setTitle('Pacientes');
    }

	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}


    patientList(token){
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

Patient.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,null))(Patient);
