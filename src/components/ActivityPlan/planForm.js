import React, {Component} from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectActiviy from "./selectActivity";

class planForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planTitle: "",
            week_selected: 1,
            week: [
                { id: "1", title: "1 semana"},
                { id: "2", title: "2 semana"},
                { id: "3", title: "3 semana"},
                { id: "4", title: "4 semana"},
            ],
            freq: [
                { id: "1", title: "1x"},
                { id: "2", title: "2x"},
                { id: "3", title: "3x"},
                { id: "4", title: "4x"},
                { id: "5", title: "5x"},
            ],
            number_of_activities: [{ qt: ""}],
            activities: [{ id: "", freq: ""}]
        };
    }


    handleNameChange = (evt) => {
        this.setState({ planTitle: evt.target.value });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        //const { name, activity_task } = this.state;
        console.log(this.state);
    };

    handleAddTask = () => {
        this.setState({
            number_of_activities: this.state.number_of_activities.concat([{ qt: "" }]),

            activities: this.state.activities.concat([{ id: "", freq: ""}]),
        });
    };

    handleRemoveTask = (idx) => () => {
        this.setState({
            number_of_activities: this.state.number_of_activities.filter((s, sidx) => idx !== sidx) ,
            activities: this.state.activities.filter((s, sidx) => idx !== sidx)

        });
    };

    onChangeWeek(newWeek){
        this.setState({
            week_selected: newWeek
        });
    }

    onChangeFreq(idx, newFreq){
        console.log(newFreq);
        const freqList = this.state.activities.map((activities, sidx) => {
            if (idx !== sidx) return activities;
            return { ...activities, freq: newFreq };
        });

        this.setState({ activities: freqList });
    }

    onChangeTask(idx, newTask){

        const taskList = this.state.activities.map((activities, sidx) => {
            if (idx !== sidx) return activities;
            return { ...activities, id: newTask };
        });

        this.setState({ activities: taskList });
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
                                value={this.state.planTitle}
                                onChange={this.handleNameChange}
                                hintText="Insert name"
                                fullWidth={true}
                            />
                        </div>
                        <div className="col-md-3" >
                            <SelectActiviy list={this.state.week} changeField={this.onChangeWeek.bind(this)} hintText="Select Week"/>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-md-6 ">
                                <h4>Task</h4>
                            </div>

                        </div>

                        {this.state.number_of_activities.map((number, idx) => (
                            <div className="row" key={idx}>
                                <div className="col-md-3" >
                                    <SelectActiviy list={this.props.list} changeField={this.onChangeTask.bind(this, idx)} hintText="Select Activity"/>
                                </div>

                                <div className="col-md-3" >
                                    <SelectActiviy list={this.state.freq} changeField={this.onChangeFreq.bind(this, idx)} hintText="Select Frequency"/>
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

/**/