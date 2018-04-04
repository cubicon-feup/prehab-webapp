import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectActiviy from './selectActivity';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class planForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            week: [
                { id: '1', title: '1 semana'},
                { id: '2', title: '2 semana'},
                { id: '3', title: '3 semana'},
                { id: '4', title: '4 semana'},
            ],
            freq: [
                { id: '1', title: '1x'},
                { id: '2', title: '2x'},
                { id: '3', title: '3x'},
                { id: '4', title: '4x'},
                { id: '5', title: '5x'},
            ],
            activity_task: [{ name: '' }],
            activity_title: [
                { value: '1', name: 'RUN' },
                { value: '2', name: 'Flex' }
            ]
        };
    }

    handleComboChange = (idx) => (event, index, value)  => {
        console.log("Handle Change");
        console.log(event);
        console.log(value);
        console.log(idx);


        const newActivityTask = this.state.activity_title.map((activity_title, sidx) => {
            if (idx !== sidx) return activity_title;
            return { ...activity_title, name: event.target.name };
        });

        this.setState({ activity_title: newActivityTask });

    }


    handleNameChange = (evt) => {
        this.setState({ name: evt.target.value });
    }

    handleTaskNameChange = (idx) => (evt) => {
        const newActivityTask = this.state.activity_task.map((activity_task, sidx) => {
            if (idx !== sidx) return activity_task;
            return { ...activity_task, name: evt.target.value };
        });

        this.setState({ activity_task: newActivityTask });
    }

    handleSubmit = (evt) => {
        //const { name, activity_task } = this.state;
        console.log(this.state);
    }

    handleAddTask = () => {
        this.setState({ activity_task: this.state.activity_task.concat([{ name: '' }]) });
    }

    handleRemoveTask = (idx) => () => {
        this.setState({ activity_task: this.state.activity_task.filter((s, sidx) => idx !== sidx) });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-2" >
                            <h1>Criar Plano</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 ">
                            <TextField
                                name="Activity Plan name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                hintText="Insert name"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-md-6 ">
                                <h4>Task</h4>
                            </div>
                        </div>

                        {this.state.activity_task.map((activity_task, idx) => (
                            <div className="row">
                                <div className="col-md-3" >
                                    <SelectActiviy list={this.props.list} hintText="Select Activity"/>
                                </div>
                                <div className="col-md-3" >
                                    <SelectActiviy list={this.state.week} hintText="Select Week"/>
                                </div>
                                <div className="col-md-3" >
                                    <SelectActiviy list={this.state.freq} hintText="Select Frequency"/>
                                </div>

                                <div className="col-md-3" >
                                    <RaisedButton label="-" primary={true} className="small" onClick={this.handleRemoveTask(idx)} />
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <div className="col-md-3">
                                <RaisedButton label="Add Task" primary={true} onClick={this.handleAddTask} />
                            </div>
                            <div className="col-md-3">
                                <RaisedButton label="Send" onClick={this.handleSubmit} primary={true}/>
                            </div>
                        </div>

                </form>
            </div>
        )
    }
}

export default planForm;