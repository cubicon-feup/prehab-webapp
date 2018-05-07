import React,{Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import Axios from 'axios';
import {getPatientsAlertList} from "../../utils/communication-manager";

class Alerts extends Component{

    constructor(props){
        super(props);
        this.state = {

            alerts:[
                {id:1,
                seen: false,
                 message: "Dificuldade com atividade de respiração",
                },
                {id:2,
                seen: false,
                 message: "Dificuldade com atividade de alongamento",
                },
                {id:3,
                seen: false,
                 message: "Não execução da atividade de respiração por 2 dias",
                }
            ]
        };
    }

//    patientList(token, patientId){
//        getPatientList(token, patientId).then(list => {
//                    console.log(list);
//                    this.setState({
//                        patientList: list.data
//                    });
//
//                }).catch(err => {
//                    console.log(err);
//                    this.setState({
//                        patientList: undefined
//                    });
//                });
//    }

    ComponentDidMount(){
        var chosenPatient= this.props.patient_tag;
        console.log(chosenPatient);
    }

    handleClick = () =>{
        this.setState({seen:true});
        console.log(this.state.alerts);
    }

    render(){
        var patient= this.props.patient;
        console.log(patient);
        console.log(this.state.alerts);
        let filteredAlerts = this.state.alerts.filter(
            (row) => {
                return row.id !== -1;
            }
        );

        return(
            <div>
                <List>
                {filteredAlerts.map( (row) => (
                  <ListItem primaryText={row.message} onClick={this.handleClick}/>
                  ))}

                </List>
             </div>
        );
    }

}

function mapStateToProps(state){
  return{
    patient: state.activePatient
  }
}
export default connect(mapStateToProps)(Alerts);
