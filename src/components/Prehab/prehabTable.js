import React, {Component} from "react";
import "../../styles/patients_style.css";
import Alert from "../../images/icons/alert.svg"


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";

class PrehabTable extends Component {
    state = {
        term: this.props.term,
        prehabList: this.props.list,
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
        console.log(this.state.prehabList);
        console.log(this.props.term);
        let filteredPatients = this.state.prehabList;

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
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Data da cirurgia">Cirurgia</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Nº de Semanas">Semanas</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Alertas">Alertas</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Data Inicio do Plano">Inicio Plano</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Data prevista para Fim do Plano">Fim Plano</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {filteredPatients.map( (row) => (
                            <TableRow className = "tableBodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.id}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.surgery_date}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.number_of_weeks}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.alerts}<img src={Alert} alt="alert" className="alertImg"/></div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.init_date}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.expected_end_date}</div></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}


export default PrehabTable;