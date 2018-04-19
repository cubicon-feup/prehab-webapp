import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";


import { createTask } from "../../utils/communication-manager";
import { validaTask, wrongCredentials } from "../../validation/task";


class taskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_type: 1,
            title: "",
            description: "",
            multi_link: "",
            errors: {},
            openDialog: false
        };
        this.onChange = this.onChange.bind(this);
    }

    handleClose = () => {
        this.setState({openDialog: false});
    };

    handleChange = (event, index, value) => this.setState({task_type: value});

    onChange = (e) => {
        e.preventDefault();
        this.setState( { [e.target.name]: e.target.value} )
    };

    isValid() {
        const { errors, isValid } = validaTask(this.state);

        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.isValid()) {
            const {task_type, title, description, multi_link} = this.state;
            createTask(title, description, multi_link, task_type, this.props.token)
                .then(suc => {
                    //display dialog
                    console.log("Save");
                    this.setState({
                        openDialog: true,
                        task_type: 1,
                        title: "",
                        description: "",
                        multi_link: ""
                    });

            }).catch(err => {
                console.log(err);
                wrongCredentials();
            });
        }
    };


    render() {
        const { errors, task_type, title, description, multi_link, openDialog } = this.state;

        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
        <div >
            <div>
                <Dialog
                    contentStyle={{width: "350px",}}
                    title="Registo Validado"
                    actions={actions}
                    modal={false}
                    open={openDialog}
                    onRequestClose={this.handleClose}
                >
                    Nova tarefa registada com sucesso
                </Dialog>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <TextField
                        name="title"
                        value={title}
                        errorText={errors.title}
                        onChange={this.onChange}
                        hintText="Inserir Titulo"
                        fullWidth={true}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        name="description"
                        value={description}
                        errorText={errors.description}
                        onChange={this.onChange}
                        hintText="Inserir descrição"
                        fullWidth={true}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        name="multi_link"
                        value={multi_link}
                        errorText={errors.multi_link}
                        onChange={this.onChange}
                        hintText="Inserir link multimédia"
                        fullWidth={true}
                    />
                </div>
                <div className="form-group">
                    <SelectField
                        name="task_type"
                        floatingLabelText="Escolher tipo de exercicio"
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
                <RaisedButton type="submit" primary={true} label="Submeter" />
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

