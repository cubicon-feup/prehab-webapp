import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const types = [
    'Diabético',
    'Hipertenso',
    'Vegetariano',
    'Insuficiente Renal',
    'Desnutrido',
    'Hepático'
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

    handleChange = (event, index, values) => this.setState({values});

    menuItems(values) {
        return types.map((types) => (
            <MenuItem
                key={types}
                insetChildren={true}
                checked={values && values.indexOf(types) > -1}
                value={types}
                primaryText={types}
            />
        ));
    }

    render() {
        const {values} = this.state;
        return (
            <SelectField
                multiple={true}
                hintText="Select a name"
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