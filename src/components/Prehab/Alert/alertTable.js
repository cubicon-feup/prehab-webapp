import React, {Component} from "react";


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";


class AlertTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            alertsList: this.props.alertsList,
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: false,
        }
    }


    render(){
        return(
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
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Tarefa">Tarefa</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Data">Data</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {this.state.alertsList.map( (row) => (
                            <TableRow className = "tableBodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.task_title} ({row.task_type})</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.tas_description}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.date}</div></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }


}

export default AlertTable
