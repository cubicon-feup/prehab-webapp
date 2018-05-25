import React, {Component} from "react";
import "../../../styles/alertTable_style.css";



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
            alertsList: {},
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


        if(this.state.alertsList.length !== 0){
        return(
            <div className="alertDiv">
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
                        <TableRow className = "headerRow">
                            <TableHeaderColumn className ="headerItem" tooltip="Tarefa">Tarefa</TableHeaderColumn>
                            <TableHeaderColumn className ="headerItem" tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn className ="headerItem" tooltip="Estado">Estado</TableHeaderColumn>
                            <TableHeaderColumn className ="headerItem" tooltip="Teve dificuldade?">Dificuldade</TableHeaderColumn>
                            <TableHeaderColumn className ="headerItem" tooltip="Data">Data</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {this.state.alertsList.reverse().map( (row) => (
                            <TableRow className = "bodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="bodyItem">{row.task_title} ({row.task_type})</TableRowColumn>
                                <TableRowColumn className ="bodyItem">{row.task_description}</TableRowColumn>
                                <TableRowColumn className ="bodyItem">{row.status}</TableRowColumn>
                                <TableRowColumn className ="bodyItem">{row.was_difficult ? "Sim" : "Não"}</TableRowColumn>
                                <TableRowColumn className ="bodyItem">{row.date}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
        }else{
            return (
                <p className="patientNameLabel"> Não tem alertas </p>
            );
        }
    }

    componentWillReceiveProps(){
        this.setState({
            alertsList : this.props.alertsList
        })
    }

    componentDidMount(){
        this.setState({
            alertsList : this.props.alertsList
        })
    }

    componentWillMount(){

        this.props.alertsList.sort(function(a, b) {
            return b.patient_task_schedule_id - a.patient_task_schedule_id;
        });

        this.setState({
            alertsList : this.props.alertsList
        })
    }


}

export default AlertTable
