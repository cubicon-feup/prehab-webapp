import React, {Component} from "react";
import doctorIcon from "../../images/icons/doctor_icon.svg";
import "../../styles/pacientes_style.css";
import Alert from "../../res/img/alert.svg"

import {
    Card,
    CardHeader,
    CardMedia
} from "material-ui/Card";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";

const tableData = [
    {
        id: "125643162",
        alerts: "2",
        surgery: "23-05-2018",
        doctor: "mani",
    },
    {
        id: "6453747",
        alerts: "0",
        surgery: "25-05-2018",
        doctor: "Magna",
    },
    {
        id: "9786070",
        alerts: "0",
        surgery: "01-05-2018",
        doctor: "JOn",
    },
    {
        id: "73686382",
        alerts: "5",
        surgery: "05-04-2018",
        doctor: "Magna",
    },
    {
        id: "12312515",
        alerts: "0",
        surgery: "25-05-2018",
        doctor: "JOn",
    },
    {
            id: "6453747",
            alerts: "0",
            surgery: "25-05-2018",
            doctor: "Magna",
        },
        {
            id: "9786070",
            alerts: "0",
            surgery: "01-05-2018",
            doctor: "JOn",
        },
        {
            id: "73686382",
            alerts: "5",
            surgery: "05-04-2018",
            doctor: "Magna",
        },
        {
            id: "12312515",
            alerts: "0",
            surgery: "25-05-2018",
            doctor: "Magna",
        },
];

function searchingFor(term){
    return function(x){
        return x.patient_tag.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class PatientTable extends Component {
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
        )
        return (
            <div>
                        <Table
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}>
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
                                        <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.alerts}<img src={Alert} className="alertImg"></img></div></TableRowColumn>
                                        <TableRowColumn className ="tableBodyLastItem"><div className="tableBodyItemInnerDiv">{row.doctor}</div></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

            </div>
        );
    }
}
