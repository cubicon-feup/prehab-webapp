import React, {Component} from "react";
import {compose} from 'redux';
import { connect } from "react-redux";
import TaskTable from "./taskTable";
import { Link } from "react-router-dom";
import "../../styles/patients_style.css";
import {getDoctorPlan} from "../../utils/communication-manager";
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

const newtask = props => <Link to="/task" {...props} />
const newPlan = props => <Link to="/newPlan" {...props} />
class Plan extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskList: undefined,
            term: '',
        }

    }

    MainActivity = () => {
        const { classes} = this.props;
        let props = {
            list:this.state.taskList,
            term:this.state.term,
        };


        if (this.props.auth === true && this.state.taskList !== undefined) {
            return (
                <Grid container spacing={32}>
                    <Grid item md={11} xs={12}>
                            <TaskTable {...props}/>
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <Tooltip id="tooltip-fab"title="Novo Plano">
                            <Button variant="fab" color="primary" aria-label="add" component={newPlan} className={classes.fab}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                            {this.settingsMenu()}
                    </Grid>
                </Grid>
            )
        }
        else if(this.props.auth === false) {

            return (
              <h1> </h1>
            )
        }
    };

    settingsMenu = () => {
        const { classes} = this.props;
        console.log(this.props.role);

        if  (this.props.auth === true && this.props.role === "Admin") {
            return (
                <Tooltip id="tooltip-fab" title="Criar Tarefa">
                <Button variant="fab" color="primary" aria-label="add" component={newtask} className={classes.fabGreen}>
                    <AddIcon />
                </Button>
                </Tooltip>
            );
        } else{
            return null
        }
    }


    componentDidMount() {
        //console.log(this.props.token);
        this.props.setTitle('Tarefas');
        this.taskList(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
	    this.taskList(nextProps.token);
        this.setState({term:nextProps.filter});
    }

	taskList(token){
		getDoctorPlan(token).then(list => {
			console.log(list);
			this.setState({
				taskList: list.data
			});

		}).catch(err => {
			console.log(err);
			this.setState({
				taskList: undefined
			});
		});
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
        auth: state.auth.isLoggedIn,
        token : state.auth.accessToken,
        role: state.auth.role
    };
};

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,null))(Plan);