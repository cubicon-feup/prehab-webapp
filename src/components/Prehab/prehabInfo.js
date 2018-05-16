import React, {Component} from "react";
import "../../styles/patientInfo_style.css";
import Circle from 'react-circle';
import { Link } from "react-router-dom"

class PatientInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            info: this.props.info,
            term: '',
        }
    }

    render(){

        let info = this.state.info.data;

        let data = {
            patient_tag: this.state.info.data.patient_tag,
        };

        return (
        <div>
            <div className="row ">
                <div className="doctorName col-md-4">
                    <p className="patientNameLabel"> {info.patient_tag}</p>
                    <p className="emailLabel"> SEXO: {info.sex}</p>
                    <p className="emailLabel"> IDADE: {info.age}</p>
                    <p className="emailLabel"> PESO: {info.weight}</p>
                    <p className="emailLabel"> ALTURA: {info.height}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                     <Circle
                        size={150} // Number: Defines the size of the circle.
                        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
                        progress={info.age} // Number: Update to change the progress and percentage.
                        progressColor="#7AC4FF"  // String: Color of "progress" portion of circle.
                        bgColor="white" // String: Color of "empty" portion of circle.
                        textColor="#7AC4FF" // String: Color of percentage text color.
                        textStyle={{
                          font: 'bold 5rem Quicksand, Regular' // CSSProperties: Custom styling for percentage.
                        }}
                        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                        roundedStroke={true}
                    />
                </div>

                <div className="col-md-3">
                     <Circle
                        size={150} // Number: Defines the size of the circle.
                        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
                        progress={69} // Number: Update to change the progress and percentage.
                        progressColor="#7AC4FF"  // String: Color of "progress" portion of circle.
                        bgColor="white" // String: Color of "empty" portion of circle.
                        textColor="#7AC4FF" // String: Color of percentage text color.
                        textStyle={{
                          font: 'bold 5rem Quicksand, Regular' // CSSProperties: Custom styling for percentage.
                        }}
                        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                        roundedStroke={true}
                    />
                </div>

                <div className="col-md-4 text-right " style={{marginTop: '90px'}}>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Link to="/newPrehab" style={{textDecoration: 'none' }} {...data}>
                                <div className="botaoMais">+</div>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                             <p className="addPatientLabel">Criar Prehab</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }

    filterList (event) {
        this.setState({term: event.target.value});
    }
}
export default PatientInfo