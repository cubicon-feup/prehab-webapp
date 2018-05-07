import React, {Component} from "react";
//import doctorIcon from "../../images/icons/doctor_icon.svg";
import "../../styles/pacientes_style.css";
import Alert from "../../images/icons/alert.svg";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PatientAlert from '../PatientsAlert/alerts';
import {connect} from 'react-redux';
import {selectPatient} from '../../actions/patientActions';
import {bindActionCreators} from 'redux';


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";

class PatientTable extends Component {
    state = {
        term: this.props.term,
        patientList: this.props.list,
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: false,
        showCheckboxes: false,
        open: false,
        chosenPatient:'',
        alertList: [],
      };


    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

     handleOpen = (patient) =>{
        this.setState({open: true});
        this.props.selectPatient(patient);

     };

      handleClose = () => {
        this.setState({open: false});
     };

    render() {
        const actions = [
          <FlatButton
            label="Ok"
            primary={true}
            onClick={this.handleClose}
          />,
        ];

        console.log(this.state.patientList);
        console.log(this.props.term);
        let filteredPatients = this.state.patientList.filter(
            (row) => {
                return row.patient_tag.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
            }
        );
        return (
            <div>

                        <Table
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                            >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}>
                                <TableRow className = "tableHeaderRow">
                                    <TableHeaderColumn className ="tableHeaderItem" tooltip="ID">ID</TableHeaderColumn>
                                    <TableHeaderColumn className ="tableHeaderItem" tooltip="Dias para cirurgia">Cirurgia</TableHeaderColumn>
                                    <TableHeaderColumn className ="tableHeaderItem" tooltip="Idade">Idade</TableHeaderColumn>
                                    <TableHeaderColumn className ="tableHeaderItem" tooltip="Sexo">Sexo</TableHeaderColumn>
                                    <TableHeaderColumn className ="tableHeaderItem" tooltip="Alertas">Alertas</TableHeaderColumn>
                                    <TableHeaderColumn className ="tableHeaderLastItem" tooltip="Médicos Associados">Médicos</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}>
                                {filteredPatients.map( (row) => (
                                    <TableRow className = "tableBodyRow" style={{border:'none'}}>
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.patient_tag}</div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.surgery}</div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.age}</div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.sex}</div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.alerts}<img src={Alert} alt="alert" className="alertImg" onClick={this.handleOpen.bind(row)}/>
                                            <Dialog
                                              title="Alertas do paciente"
                                              actions={actions}
                                              modal={false}
                                              open={this.state.open}
                                              onRequestClose={this.handleClose}>
                                                <PatientAlert chosenPatient= {this.state.chosenPatient}/>
                                            </Dialog>
                                        </div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyLastItem"><div className="tableBodyItemInnerDiv">{row.doctor}</div></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
            </div>
        );
    }
}

function mapStateToProps(state){
return(
  {patients: state.patients}
);
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({selectPatient: selectPatient}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);