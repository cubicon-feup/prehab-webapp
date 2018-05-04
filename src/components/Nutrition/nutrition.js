import React, {Component} from "react";
import NutritionForm from "./nutritionForm";


class Nutrition extends Component {

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<h1>Nutrição</h1>
					</div>
					<div className="col-md-12">
						<NutritionForm/>
					</div>
				</div>
			</div>
		);
	}
}

export default Nutrition;