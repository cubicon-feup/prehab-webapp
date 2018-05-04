import './formik-demo.css';
import React, { Component } from "react";

import 'react-select/dist/react-select.css';
// Helper styles for demo
import './formik-demo.css';
import MyAmazingForm from "./formComponents/formComp";


class NutritionForm extends Component {


	render() {

		return (
			<div className="content-middle-page">
				<div className="col-md-12">
					<MyAmazingForm token={this.props.token}/>

				</div>
			</div>
		)
	}

}

export default NutritionForm;
