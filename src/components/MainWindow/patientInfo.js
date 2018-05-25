import React, {Component} from "react";
import "../../styles/patientInfo_style.css";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
  });

const newPrehab = props => <Link to="/newPrehab" {...props} />

class PatientInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            info: this.props.info,
        }
    }

    render(){
        const { classes} = this.props;
        let info = this.state.info.data;
        let constraints = info.constraints;
        let doctors = info.doctors_associated;
        
        if(info.sex === "F"){
            info.sex = "Feminino";
        }else{
            info.sex = "Masculino";
        }

        return (
        <div className="row">
            <div className="col-md-9">

                <div className="row">
                    <p className="patientNameLabel"> {info.patient_tag}</p>
                </div>
                <div className="row ">
                    <div className="col-md-12">
                        <p className="doctorNameLabel"> Informação Pessoal </p>
                    </div>
                    <div className="doctorName col-md-2">
                        <p className="emailLabel"> {info.sex}</p>
                    </div>
                    <div className="doctorName col-md-2">
                        <p className="emailLabel"> {info.age} anos</p>
                    </div>
                    <div className="doctorName col-md-2">
                        <p className="emailLabel">  {info.weight} kg</p>
                    </div>
                    <div className="doctorName col-md-2">
                        <p className="emailLabel">  {info.height} cm</p>
                    </div>
                </div>


                <div className="row">
                    {constraints.map( (row) => (
                        <div className="doctorName col-md-2 constraint">
                            <p className="constraint">{row.title}</p>
                        </div>
                    ))}
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <p className="doctorNameLabel"> Médicos </p>
                    </div>
                    {doctors.map( (row) => (
                        <div className="doctorName col-md-2">
                            <p className="emailLabel"> {row.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Tooltip id="tooltip-fab" title="Criar Prehabs">
                <Button variant="fab" color="primary" aria-label="add" component={newPrehab} className={classes.fab}>
                    <AddIcon />
                </Button>
            </Tooltip>
        </div>

        )
    }

}

PatientInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientInfo)