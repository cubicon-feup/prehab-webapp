import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const patient_type = [
    { title: "Diabético", id: 1},
    { title: "Insuficiente Renal", id: 2},
    { title: "Desnutrido", id: 3},
    { title: "Vegetariano", id: 4},
    { title: "Hepático", id: 5},
    { title: "Hipertenso", id: 6}
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
class SelectPatientType extends Component {
    constructor(props){
        super(props);
        this.state = {
            values: []
        };
    }

    handleChange = (event, index, values) => {
        //console.log(values);
        this.props.changeField(values);
        this.setState({values});
    }

    menuItems(values) {
        return patient_type.map((types) => (
            <MenuItem
                key={types.id}
                insetChildren={true}
                checked={values && values.indexOf(types.id) > -1}
                value={types.id}
                primaryText={types.title}
            />
        ));
    }

    render() {
        const {values} = this.state;
        return (
            <SelectField
                multiple={true}
                hintText="Selecionar restrições"
                value={values}
                onChange={this.handleChange}
                fullWidth={true}

            >
                {this.menuItems(values)}
            </SelectField>
        );
    }
}

export default SelectPatientType;