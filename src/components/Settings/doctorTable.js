import React, {Component} from "react";
import "../../styles/settings_style.css";
import {getDoctorById} from "../../utils/communication-manager";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";

class DoctorTable extends Component {
    state = {
        filteredList: this.props.list,
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



        let filteredList = this.state.doctorList.filter(
            (row) => {
                if (row.name !== null) {
                    return row.name.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
                }
            }
        );

        if(this.state.filteredList.length !== filteredList.length){
            this.setState({
                filteredList: filteredList,
            });
        }


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
                        {filteredList.map( (row) => (
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
            });
        };
}


export default DoctorTable;