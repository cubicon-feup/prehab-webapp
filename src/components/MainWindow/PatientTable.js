import React, {Component} from 'react';
import doctorIcon from "../../images/icons/doctor_icon.svg";
import {
    Card,
    CardHeader,
    CardMedia
} from 'material-ui/Card';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const tableData = [
    {
        id: '125643162',
        alerts: '2',
        surgery: '23-05-2018',
        doctor: 'Magna',
    },
    {
        id: '6453747',
        alerts: '0',
        surgery: '25-05-2018',
        doctor: 'Magna',
    },
    {
        id: '9786070',
        alerts: '0',
        surgery: '01-05-2018',
        doctor: 'Magna',
    },
    {
        id: '73686382',
        alerts: '5',
        surgery: '05-04-2018',
        doctor: 'Magna',
    },
    {
        id: '12312515',
        alerts: '0',
        surgery: '25-05-2018',
        doctor: 'Magna',
    },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class PatientTable extends Component {
    state = {
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title="Doctor"
                        subtitle="Subtitle"
                        avatar={doctorIcon}
                    />
                    <CardMedia>
                        <Table
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="3" tooltip="Lista de Pacientes" style={{textAlign: 'center'}}>
                                        Lista de Pacientes
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Index">Index</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Dias para cirurgia">Cirurgia</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Alertas">Alertas</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Médicos Associados">Médicos</TableHeaderColumn>

                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                            >
                                {tableData.map( (row, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{index}</TableRowColumn>
                                        <TableRowColumn>{row.id}</TableRowColumn>
                                        <TableRowColumn>{row.surgery}</TableRowColumn>
                                        <TableRowColumn>{row.alerts}</TableRowColumn>
                                        <TableRowColumn>{row.doctor}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardMedia>
                </Card>
            </div>
        );
    }
}
