import React, {Component} from "react";
//import doctorIcon from "../../images/icons/doctor_icon.svg";
import "../../styles/patients_style.css";


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
class NutritionTable extends Component {
    state = {
        filteredMeals: this.props.list,
        token: this.props.token,
        term: this.props.term,
        nutritionList: this.props.list,
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
    
    mealType (mealType) {
        switch(mealType) {
            case 1:
                return <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">Pequeno-Almoço</div></TableRowColumn>;
            case 2:
                return <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">Refeição Principal</div></TableRowColumn>;
            case 3:
                return <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">Lanche</div></TableRowColumn>;
            
            default:
                return <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv"></div></TableRowColumn>;
        }
    }

    render() {
        console.log(this.state.nutritionList);
        console.log(this.props.term);
        let filteredMeals = this.state.nutritionList.sort((a, b) => a.id > b.id);

        if(this.state.filteredMeals.length !== filteredMeals.length){
            this.setState({
                filteredMeals: filteredMeals
            });
        }

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
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Nome">Nome</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderItem" tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn className ="tableHeaderLastItem" tooltip="Tipo de Refeição">Tipo de Refeição</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {filteredMeals.map( (row) => (
                            <TableRow className = "tableBodyRow" style={{border:'none'}}>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.id}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.title}</div></TableRowColumn>
                                <TableRowColumn className ="tableBodyItem"><div className="tableBodyItemInnerDiv">{row.description}</div></TableRowColumn>
                                {this.mealType(row.meal_type)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}


export default NutritionTable;