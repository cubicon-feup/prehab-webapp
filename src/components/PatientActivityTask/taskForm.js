import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { createTask } from "../../utils/communication-manager";


class taskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_type: 1,
            title: '',
            description: '',
            multi_link: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
    }

    handleChange = (event, index, value) => this.setState({task_type: value});

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
        const { task_type, title, description, multi_link } = this.state;
        createTask(title, description, multi_link, task_type);
    }


    render() {
        const { errors, task_type, title, description, multi_link } = this.state;

        return (
        <div >
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextField
                            name="title"
                            value={title}
                            errorText={errors.title}
                            onChange={this.onChange}
                            hintText="Insert Title"
                            fullWidth={true}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            name="description"
                            value={description}
                            errorText={errors.description}
                            onChange={this.onChange}
                            hintText="Insert description"
                            fullWidth={true}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            name="multi_link"
                            value={multi_link}
                            errorText={errors.multi_link}
                            onChange={this.onChange}
                            hintText="Insert Multimedia Link"
                            fullWidth={true}
                        />
                    </div>
                    <div className="form-group">
                        <SelectField
                            name="task_type"
                            floatingLabelText="Tipo"
                            value={task_type}
                            onChange={this.handleChange}
                            fullWidth={true}
                        >
                            <MenuItem value={1} primaryText="Respiratório" />
                            <MenuItem value={2} primaryText="Endurance" />
                            <MenuItem value={3} primaryText="Resistencia" />
                        </SelectField>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
}


export default taskForm;


/*<select name="task_type" value={task_type} onChange={this.onChange}>
                            <option value="1" default>Respiratório</option>
                            <option value="2">Endurance</option>
                            <option value="3">Resistencia</option>
                        </select>*/