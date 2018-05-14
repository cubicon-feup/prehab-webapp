import React, {Component} from "react";
import "../../styles/doctorInfo_style.css";
import DoctorPacientesTable from "./doctorPacientesTable.js";

class DoctorInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            info: this.props.info,
            pacientesList: this.props.info.data.patients,
            term: '',
        }
    }

    render(){

        let props = {
            list:this.state.pacientesList,
            term:this.state.term,
            token: this.props.token,

        };

        let info = this.state.info.data;
        return (
        <div>
            <div className="row ">
                <div className="doctorName col-md-4">
                    <p className="doctorNameLabel"> {info.name}</p>
                    <p className="emailLabel"> {info.email}</p>
                </div>
                <div className = "searchBarDiv col-md-8 text-right">
                    <input className = "searchBar"
                        placeholder = "Pesquisar"
                        value = {this.state.term}
                        onChange = {this.filterList.bind(this)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p className="doctorNameLabel"> Os Seus Pacientes </p>
                </div>
                <div className="col-md-9 text-left">
                    <DoctorPacientesTable  {...props} />
                </div>
            </div>
        </div>

        )
    }

    filterList (event) {
        this.setState({term: event.target.value});
    }
}
export default DoctorInfo