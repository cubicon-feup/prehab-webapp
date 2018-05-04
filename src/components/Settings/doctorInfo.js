import React, {Component} from "react";

class DoctorInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            info: this.props.info
        }
    }

    render(){
        let info = this.state.info.data;
        return (
            <h1>{info.name}</h1>
        )
    }
}
export default DoctorInfo