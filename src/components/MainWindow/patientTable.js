import React, {Component} from "react";
//import doctorIcon from "../../images/icons/doctor_icon.svg";
import "../../styles/patients_style.css";
import {getPatientById} from "../../utils/communication-manager";


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";


/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class PatientTable extends Component {
    state = {
        filteredPatients: this.props.list,
        token: this.props.token,
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
      };


    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    render() {
        console.log(this.state.patientList);
        console.log(this.props.term);
        let filteredPatients = this.state.patientList.filter(
            (row) => {
                return row.patient_tag.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
            }
        );

        if(this.state.filteredPatients.length !== filteredPatients.length){
            this.setState({
                filteredPatients: filteredPatients
            });
        }

        return (
            <div>
                <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onCellClick={this.getPatient}
                    >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}>
                        <TableRow className = "tableHeaderRow">
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Idade">Idade</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Sexo">Sexo</TableHeaderColumn>
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
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.age}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.sex}</div></TableRowColumn>
                                {row.doctors_associated.map((doc) => (
                                    <TableRowColumn className ="tableBodyLastItem"><div className="tableBodyItemInnerDiv">{doc.name}</div></TableRowColumn>
                                ))}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    getPatient = (row,column, key) => {

            console.log(this.state.filteredPatients[row].name);
            let patientId = this.state.filteredPatients[row].user;
            console.log(this.state.token);
            getPatientById(patientId, this.state.token).then(list => {
                    console.log(list);

                    this.props.action(list);

                }).catch(err => {
                    console.log(err);
                });
            };
}


export default PatientTable;