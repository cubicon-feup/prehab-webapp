import React, {Component} from "react";
//import doctorIcon from "../../images/icons/doctor_icon.svg";
import "../../styles/pacientes_style.css";
import Alert from "../../images/icons/alert.svg"
import {getDoctorById} from "../../utils/communication-manager";
import {withRouter} from "react-router-dom";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";
/*
const tableData = [
    {
        id: "125643162",git
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
*/

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class DoctorTable extends Component {
    state = {
        filteredList: undefined,
        token: this.props.token,
        term: this.props.term,
        doctorList: this.props.list,
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

        console.log(this.state.doctorList);
        this.state.filteredList = this.state.doctorList.filter(
            (row) => {
                return row.name.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
            }
        );


        return (
            <div>
                <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onCellClick={this.getDoctor}
                    >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}>
                        <TableRow className = "tableHeaderRow">
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Nome">Nome</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Cargo">Cargo</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {this.state.filteredList.map( (row) => (
                            <TableRow key={row.id} className = "tableBodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.name}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.role_name}</div></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );

    }

    getDoctor = (row,column, key) => {

        console.log(this.state.filteredList[row].name);
        let doctorId = this.state.filteredList[row].id;
        console.log(this.state.token);
        getDoctorById(doctorId, this.state.token).then(list => {
                console.log(list);

                this.props.action(list);

            }).catch(err => {
                console.log(err);
                /*this.setState({
                    doctorList: undefined
                });*/
            });
        };
}


export default DoctorTable;