import React, {Component} from "react";
import "../../styles/prehabInfo_style.css";
import Circle from 'react-circle';
import Dialog from "material-ui/Dialog";

import { withRouter } from "react-router-dom";
import {cancelPrehab} from "../../utils/communication-manager";
import RaisedButton from "material-ui/RaisedButton";

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';

import DetailList from "./Plano/detailList";
import AlertTable from "./Alert/alertTable";

class PatientInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            openDialog: false,
            openAlerts: false,
            info: this.props.info,
            term: '',
            token: this.props.token,
            redirect: false,
            number_of_weeks: this.props.number_of_weeks,
            tabDates: this.props.tabDates,
            tabContent: this.props.tabContent,
            
        }
        //this.openModal = this.openModal.bind(this);
        //this.closeModal = this.closeModal.bind(this);
        this.cancelPrehab = this.cancelPrehab.bind(this);
    }

    openAlerts = () =>{
        this.setState({
            openAlerts: true,
        })
    }

    closeAlerts = () =>{
        this.setState({
            openAlerts: false,
        })
    }
    
    openDialog = () => {
        console.log(this.state);
        this.setState({
            number_of_weeks: this.props.number_of_weeks,
            tabDates: this.props.tabDates,
            tabContent: this.props.tabContent,
            openDialog: true,
        });
    }

    closeDialog = () =>{
        this.setState({
            openDialog: false,
        })
    }

    cancelPrehab() {
        if (window.confirm('Tem a certeza que pretende cancelar este Prehab?')) {       
            
            cancelPrehab(this.state.token, this.props.info.data.id).then(() => {
                window.location.reload();

            }).catch(err => {
                console.log(err);
            });
            

        } else {
            // Do nothing!
        }
    }

    render() {
        let info = this.state.info.data;
        let doctors = info.doctors;
        let patient = info.patient;
        let statistics = info.statistics;

        var daysLeft = this.calculateDaysLeft(info.surgery_date);
        var daysLeftPrehab = undefined;
        if(statistics.prehab_status !== "Completed"){
            daysLeftPrehab = this.calculateDaysLeft(info.expected_end_date)
        }else{
            daysLeftPrehab = 0
        }

        var totalProgress = Math.floor(this.calculateTotalProgress(statistics.total_activities_until_now, statistics.total_activities));
        var doneProgress = Math.floor(this.calculateDoneProgress(statistics.activities_done, statistics.activities_not_done));
        var difficulties = Math.floor(this.calculateDifficulties(statistics.total_activities_until_now, statistics.activities_with_difficulty));

        const actions = [ <RaisedButton label="Ok" primary={true} onClick={this.closeDialog}/> ];
        const actionsAlert = [ <RaisedButton label="Ok" primary={true} onClick={this.closeAlerts}/> ];

        if(patient.sex === "F"){
            patient.sex = "Feminino";
        }else{
            patient.sex = "Masculino";
        }

        var color = "primary";
        if(info.number_of_alerts_unseen !== 0){
            color = "secondary";
        }


        return (
        <div>
            <div className="row">
                <p className="patientNameLabel"> {patient.patient_tag} <p className="emailLabel"> {daysLeft} Dias p/ cirurgia</p></p>
                <IconButton onClick={this.openAlerts} className="alertIcon">
                      <Badge badgeContent={info.number_of_alerts_unseen} color={color}>
                        <MailIcon />
                      </Badge>
                </IconButton>
                <Dialog
                    title="Alertas"
                    actions={actionsAlert}
                    modal={false}
                    open={this.state.openAlerts}
                    onRequestClose={this.closeAlerts}>
                    <AlertTable alertsList={info.alerts} />
                </Dialog>

                <button onClick={this.openDialog} className="openModal">Plano de Atividades</button>
                <Dialog
                    title="My Title"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.closeDialog}>
                        <DetailList number_of_weeks={this.state.number_of_weeks} tabDates={this.state.tabDates} tabContent={this.state.tabContent}/>
                </Dialog>
                <button onClick={this.cancelPrehab} className="cancelPrehab">Cancelar Prehab</button>
            </div>

            <div className="row ">
                <div className="col-md-12">
                    <p className="doctorNameLabel"> Informação Pessoal </p>
                </div>
                <div className="doctorName col-md-2">
                    <p className="emailLabel"> {patient.sex}</p>
                </div>
                <div className="doctorName col-md-2">
                    <p className="emailLabel"> {patient.age} anos</p>
                </div>
                <div className="doctorName col-md-2">
                    <p className="emailLabel">  {patient.weight} kg</p>
                </div>
                <div className="doctorName col-md-2">
                    <p className="emailLabel">  {patient.height} cm</p>
                </div>
            </div>
            <div className="row">
                {patient.patient_constraints.map( (row) => (
                    <div className="doctorName col-md-2">
                        <p className="emailLabel">{row.title}</p>
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

            <div className="row">
                <div className="col-md-12">
                    <p className="doctorNameLabel"> Progresso (faltam {daysLeftPrehab} dias)</p>
                </div>
                <div className="col-md-3">
                     <Circle
                        size={150} // Number: Defines the size of the circle.
                        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
                        progress={totalProgress} // Number: Update to change the progress and percentage.
                        progressColor="#7AC4FF"  // String: Color of "progress" portion of circle.
                        bgColor="white" // String: Color of "empty" portion of circle.
                        textColor="#7AC4FF" // String: Color of percentage text color.
                        textStyle={{
                          font: 'bold 5rem Quicksand, Regular' // CSSProperties: Custom styling for percentage.
                        }}
                        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                        roundedStroke={true}
                    />
                    <div className="col-md-12">
                        <p className="doctorNameLabel"> Total {statistics.total_activities_until_now} / {statistics.total_activities} </p>
                    </div>
                </div>

                <div className="col-md-3">
                     <Circle
                        size={150} // Number: Defines the size of the circle.
                        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
                        progress={doneProgress} // Number: Update to change the progress and percentage.
                        progressColor="#85e085"  // String: Color of "progress" portion of circle.
                        bgColor="#ff5c33" // String: Color of "empty" portion of circle.
                        textColor="#85e085" // String: Color of percentage text color.
                        textStyle={{
                          font: 'bold 5rem Quicksand, Regular' // CSSProperties: Custom styling for percentage.
                        }}
                        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                        roundedStroke={true}
                    />
                    <div className="col-md-12">
                        <p className="doctorNameLabel"> Tarefas Realizadas {statistics.activities_done} / {statistics.total_activities_until_now} </p>
                    </div>
                </div>
                <div className="col-md-3">
                     <Circle
                        size={150} // Number: Defines the size of the circle.
                        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
                        progress={difficulties} // Number: Update to change the progress and percentage.
                        progressColor="#ffd666"  // String: Color of "progress" portion of circle.
                        bgColor="white" // String: Color of "empty" portion of circle.
                        textColor="#ffd666" // String: Color of percentage text color.
                        textStyle={{
                          font: 'bold 5rem Quicksand, Regular' // CSSProperties: Custom styling for percentage.
                        }}
                        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                        roundedStroke={true}
                    />
                    <div className="col-md-12">
                        <p className="doctorNameLabel"> Tarefas c/ dificuldade {statistics.activities_with_difficulty} / {statistics.total_activities_until_now} </p>
                    </div>
                </div>
            </div>
        </div>

        )
    }

    calculateDaysLeft(surgery_date){

        var sdate = new Date(surgery_date);
        console.log(sdate.toDateString());

        let today = new Date();

        var daysLeft = Math.floor((Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));

        console.log("DIF: " + daysLeft);

        return daysLeft;

    }



    calculateTotalProgress(tasksTillNow, totalTasks){


        var percentage = (tasksTillNow * 100)/totalTasks;

        if(isNaN(percentage)){
            percentage = 0;
        }

        return percentage;
    }

    calculateDoneProgress(tasksDone, tasksNotDone){

        var percentage = (tasksDone)/(tasksDone+tasksNotDone) * 100;

        if(isNaN(percentage)){
            percentage = 0;
        }

        return percentage;
    }

    calculateDifficulties(tasksTillNow, tasksDifficulty){

        var percentage = (tasksDifficulty * 100)/tasksTillNow;

        if(isNaN(percentage)){
            percentage = 0;
        }

        return percentage;
    }

    filterList (event) {
        this.setState({term: event.target.value});
    }
}
export default withRouter(PatientInfo);