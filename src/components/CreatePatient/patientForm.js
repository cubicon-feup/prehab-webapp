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
                        title="Criar paciente"

                    />
                    <CardMedia>
                        <PatientStepper token={this.props.token}/>
                        <br />
                        <br />
                    </CardMedia>
                </Card>

            </div>
        );
    }
}

export default PatientForm;