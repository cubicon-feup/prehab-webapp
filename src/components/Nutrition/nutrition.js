import React, {Component} from "react";
import {compose} from 'redux';
import { connect } from "react-redux";
import NutritionTable from "./nutritionTable";
import { Link } from "react-router-dom";
import {getNutritionList} from "../../utils/communication-manager";
import "../../styles/patients_style.css";

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

const newNutrition = props => <Link to="/newNutrition" {...props} />

class Nutrition extends Component {
    constructor(props){
        super(props);
        this.state = {
            nutritionList: undefined,
            term: '',
        }

    }

    MainActivity = () => {
        const { classes} = this.props;
        let props = {
            list:this.state.nutritionList,
            term:this.state.term,
        };


        if (this.props.auth === true && this.state.nutritionList !== undefined) {
            return (
                <Grid container spacing={32}>
                    <Grid item md={11} xs={12}>
                         <NutritionTable {...props}/>
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <Tooltip id="tooltip-fab" title="Novo Plano">
                            <Button variant="fab" color="primary" aria-label="add" component={newNutrition} className={classes.fab}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            )
        }

        else if(this.props.auth === false) {
            return (
                ""
            )
        }
    };


    componentWillReceiveProps(nextProps) {
      this.setState({term: nextProps.filter});
      this.nutritionList(nextProps.token);

    }

    componentDidMount() {
      this.props.setTitle('Planos de nutrição');
      this.nutritionList(this.props.token);
    }


	render() {
		return (
            <div >
                {this.MainActivity()}
            </div>
		);
	}




    nutritionList(token){
        getNutritionList(token).then(list => {
                    console.log(list);
                    this.setState({
                        nutritionList: list.data
                    });

                }).catch(err => {
                    console.log(err);
                    this.setState({
                        nutritionList: undefined
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
Nutrition.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,null))(Nutrition);