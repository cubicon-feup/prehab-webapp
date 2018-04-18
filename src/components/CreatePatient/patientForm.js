import React, {Component} from "react";
import PatientStepper from "./patientStepper";
import {
    Card,
    CardHeader,
    CardMedia
} from "material-ui/Card";

class PatientForm extends Component{

    render() {
        return (
            <div className="content-middle-page">
                <Card>
                    <CardHeader
                        title="Create Patient"
                        subtitle="Create Patient"
                    />
                    <CardMedia>
                        <PatientStepper exercisePlans={this.props.exercisePlans} token={this.props.token}/>
                        <br />
                        <br />
                    </CardMedia>
                </Card>

            </div>
        );
    }
}

export default PatientForm;