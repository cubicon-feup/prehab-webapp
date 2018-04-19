import React, {Component} from "react";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from "material-ui/RaisedButton";

class StepperPlan extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: "",
            nutrition:""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
            e.preventDefault();
            this.setState( { [e.target.name]: e.target.value} )
    };


    render(){
        const { task, nutrition } = this.state;
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="row ">
                    <div className="col-md-8">
                        <SelectField
                            hintText="Task"
                            value={task}
                            fullWidth={true}
                            onChange={this.handleChange}>
                            <MenuItem value="1" primaryText="Upper body strength training" />
                            <MenuItem value="2" primaryText="Lower body strength training" />
                            <MenuItem value="3" primaryText="Cardio training for weight loss" />
                            <MenuItem value="4" primaryText="Cardio training for elderly" />
                        </SelectField>
                    </div>
                    <div className="col-md-4">
                    <div className="other-content-center">
                        <RaisedButton type="submit" primary={true} label="Apply"/>
                    </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-8">
                        <SelectField
                            hintText="Nutrition"
                            value={nutrition}
                            fullWidth={true}
                            onChange={this.handleChange}>
                            <MenuItem value="1" primaryText="Weight loss diet" />
                            <MenuItem value="2" primaryText="Weight gain diet" />
                            <MenuItem value="3" primaryText="Low carb high protein" />
                            <MenuItem value="4" primaryText="Iron deficiency" />
                        </SelectField>
                    </div>
                    <div className="col-md-4">
                    <div className="other-content-center">
                        <RaisedButton type="submit" primary={true} label="Apply"/>
                    </div>
                    </div>
                </div>
                </form>
            </div>
        );
    }

}

export default StepperPlan;