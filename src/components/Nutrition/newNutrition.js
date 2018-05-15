import React, {Component} from "react";
import NutritionForm from "./nutritionForm";
import {connect} from "react-redux";


class NewNutrition extends Component {

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<h1>Nutrição</h1>
					</div>
					<div className="col-md-12">
						<NutritionForm token={this.props.token}/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.isLoggedIn,
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps, null)(NewNutrition);