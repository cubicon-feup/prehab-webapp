import React, {Component} from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

/*
const persons = [
    {value: 0, name: "Correr"},
    {value: 1, name: "Flexões"},
    {value: 2, name: "April Tucker"},
    {value: 3, name: "Ralph Hubbard"},
    {value: 4, name: "Omar Alexander"},
    {value: 5, name: "Carlos Abbott"},
    {value: 6, name: "Miriam Wagner"},
    {value: 7, name: "Bradley Wilkerson"},
    {value: 8, name: "Virginia Andrews"},
    {value: 9, name: "Kelly Snyder"},
];
*/
/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
export default class selectActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: '',
            hintText: "",
        };
    }

    componentDidMount(){

        this.setState({
            list: this.props.list,
            hintText: this.props.hintText
        });
    }

    handleChange = (event, index, values) => {
        this.props.changeField(this.state.list[index].id);
        this.setState({value: values});

    }


    menuItems(list) {
        return list.map((list) => (
            <MenuItem
                key={list.id}
                value={list.title}
                primaryText={list.title}
            />
        ));
    }

    render() {
        return (
            <SelectField
                multiple={false}
                hintText={this.state.hintText}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
            >
                {this.menuItems(this.state.list)}
            </SelectField>
        );
    }
}