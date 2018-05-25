import React, {Component} from "react";
import NutritionForm from "./nutritionForm";
import {connect} from "react-redux";


class NewNutrition extends Component {
	componentDidMount() {
        this.props.setTitle('Novo plano de Nutrição');
	}
	
	render() {
		return (
			<div>
				<div className="row">
					<NutritionForm token={this.props.token}/>
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