import React, {Component} from "react";
import "../../styles/patients_style.css";
import Alert from "../../images/icons/alert.svg";
import {getPrehabById} from "../../utils/communication-manager";

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
        filteredPrehabs: this.props.list,
        token: this.props.token,
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
        //let filteredPrehabs = this.state.prehabList;

        let filteredPrehabs = this.state.prehabList.filter(
            (row) => {
                return row.info.patient_tag.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
            }
        );

        if(this.state.filteredPrehabs.length !== filteredPrehabs.length){
            this.setState({
                filteredPrehabs: filteredPrehabs
            });
        }

        return (
            <div>
                <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onCellClick={this.getPrehab}
                    >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}>
                        <TableRow className = "tableHeaderRow">
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="ID">Paciente</TableHeaderColumn>
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
                        {filteredPrehabs.map( (row) => (
                            <TableRow className = "tableBodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.info.patient_tag}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.surgery_date}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.number_of_weeks}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.info.number_of_alerts_unseen}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.init_date}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.expected_end_date}</div></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    getPrehab = (row,column, key) => {

        console.log(this.state.filteredPrehabs[row].name);
        let prehabId = this.state.filteredPrehabs[row].id;
        console.log(this.state.token);
        getPrehabById(prehabId, this.state.token).then(list => {
                console.log(list);
                
                this.props.action(list);

            }).catch(err => {
                console.log(err);
            });
    };
}


export default PrehabTable;