import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import SelectActiviy from "../SelectButton/selectActivity";

class StepPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freq: [
                { id: 1, title: "1x"},
                { id: 2, title: "2x"},
                { id: 3, title: "3x"},
                { id: 4, title: "4x"},
                { id: 5, title: "5x"},
            ],
            number_of_activities: [{ qt: ""}],
            activities: [{ task_id : "", times_per_week: ""}]
        };
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.onFormSubmit(this.state.activities);
    }

    handleAddTask = () => {
        this.setState({
            number_of_activities: this.state.number_of_activities.concat([{ qt: "" }]),
            activities: this.state.activities.concat([{ task_id: "", times_per_week: ""}]),
        });
    }

    handleRemoveTask = (idx) => () => {
        this.setState({
            number_of_activities: this.state.number_of_activities.filter((s, sidx) => idx !== sidx) ,
            activities: this.state.activities.filter((s, sidx) => idx !== sidx)

        });
    }

    onChangeFreq(idx, newFreq){
        const freqList = this.state.activities.map((activities, sidx) => {
            if (idx !== sidx) return activities;
            return { ...activities, times_per_week: newFreq };
        });

        this.setState({ activities: freqList });
    }

    onChangeTask(idx, newTask){

        const taskList = this.state.activities.map((activities, sidx) => {
            if (idx !== sidx) return activities;
            return { ...activities, task_id: newTask };
        });

        this.setState({ activities: taskList });
    }

    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 ">
                            <h4>Task</h4>
                        </div>
                    </div>

                    {this.state.number_of_activities.map((number, idx) => (
                        <div className="row" key={idx}>
                            <div className="col-md-4" >
                                <SelectActiviy list={this.props.list} fullWidth={true} changeField={this.onChangeTask.bind(this, idx)} hintText="Select Activity"/>
                            </div>

                            <div className="col-md-4" >
                                <SelectActiviy list={this.state.freq} fullWidth={true} changeField={this.onChangeFreq.bind(this, idx)} hintText="Select Frequency"/>
                            </div>

                            <div className="col-md-3" >
                                <RaisedButton label="Retirar" primary={true} className="small" onClick={this.handleRemoveTask(idx)} />
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-md-6">
                            <RaisedButton label="Adicionar Exercicio" primary={true} onClick={this.handleAddTask} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <RaisedButton label="Submit" type="submit" primary={true}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default StepPlan;

/*<!--<div className="col-md-3">
                            <RaisedButton label="" onClick={this.handleSubmit} primary={true}/>
                        </div>-->*/