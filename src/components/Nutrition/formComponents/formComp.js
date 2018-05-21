import Yup from "yup";
import SpecialSelect from "./selectComp";
import {  Field, Form, Formik } from 'formik';
import React, { Component } from "react";

import {foodIcon} from "../../../images/foodIcon.svg";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import { EditorState, convertToRaw } from 'draft-js';
import {sendNutrition} from "../../../utils/communication-manager";


import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

const SelectOptions = [
	{ value: 1, label: "Diabético"},
	{ value: 2, label: "Desnutrido"},
	{ value: 3, label: "Vegetariano"},
	{ value: 4, label: "Hepático"},
	{ value: 5, label: "Hipertenso"}
];

const typeOptions = [
	{ value: 1, label: "Pequeno-Almoço"},
	{ value: 2, label: "Refeição Principal"},
	{ value: 3, label: "Lanche"}
];

class MyAmazingForm extends Component {

	constructor(props){
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			topics: [],
			type: "",
			allText: "",
			openDialog: false,
			dialogTitle: "",
			dialogMessage: ""
		};
	}

	onEditorStateChange = (editorState) => {
		//this.props.setFieldValue('description', convertToRaw(editorState.getCurrentContent()));
		this.setState({
			editorState,
			allText: convertToRaw(editorState.getCurrentContent())
		});
	};

	openDialog(title, message){
        this.setState({
            openDialog: true,
            dialogTitle: title,
            dialogMessage: message
        });
    }

	handleClose = () => {
		this.setState({openDialog: false});
	};


	render() {
		const { editorState, openDialog } = this.state;
		const actions = [
			<RaisedButton
				label="Ok"
				primary={true}
				onClick={this.handleClose}
			/>,
		];
		return (
			<div>
				<div>
					<Dialog
						contentStyle={{width: "350px",}}
						title={this.state.dialogTitle}
						actions={actions}
						modal={false}
						open={openDialog}
						onRequestClose={this.handleClose}
					>
						{this.state.dialogMessage}
					</Dialog>
				</div>
			<Formik
				validationSchema= { Yup.object().shape({
					title: Yup.string()
						.required('Preencher titulo!'),
					topics: Yup.array()
						.min(1, 'Escolher Restrição')
						.of(
							Yup.object().shape({
								label: Yup.string().required(),
								value: Yup.string().required(),
							})
						),
					nutritionType: Yup.string()
					.required('Escolher tipo!'),
				})}
				initialValues={{
					title: '',
					topics: SelectOptions,
					nutritionType: '',
					description: EditorState.createEmpty()
				}}
				onSubmit={(values, actions) => {
					// this could also easily use props or other
					// local state to alter the behavior if needed
					// this.props.sendValuesToServer(values)

					console.log(values);

					let allText = "";

					this.state.allText.blocks.forEach(function(val,index) {
						allText += val.text + "\n";
					})

					let restrictions = [];
					values.topics.forEach(function(topic, index){
						restrictions.push(topic.value);
					})

					console.log(this.props.token);
					console.log(values.title);
					console.log(restrictions);
					console.log(allText);
					console.log(values.nutritionType);

					sendNutrition(this.props.token, values.title, restrictions, values.nutritionType.value, allText).then(
						success => {
							this.openDialog("SUCESSO", "Refeição criada com sucesso");
							actions.setSubmitting(false)
						})
						.catch((response) => {
                            response.then((error) => {

                                this.openDialog("ERRO", error.custom_message);
                                console.log(error);

                                actions.setSubmitting(false)

                            })
                        });



					/*setTimeout(() => {
						alert(JSON.stringify(values, null, 2))
						actions.setSubmitting(false)
					}, 1000)*/
				}}
				render={({ values, touched, errors, dirty, isSubmitting, setFieldValue, setFieldTouched, handleReset }) => (
					<Form >
						<label htmlFor="title" style={{ display: 'block' }}>
							Titulo
						</label>
						<Field
							name="title"
							placeholder="Inserir Titulo"
							type="text"
							value={values.title}
						/>
						{errors.title &&
						touched.title && (
							<div style={{ color: 'red', marginTop: '.5rem' }}>
								{errors.title}
							</div>
						)}

						<SpecialSelect
							id="Tipo"
							value={values.nutritionType}
							onChange={setFieldValue}
							onBlur={setFieldTouched}
							error={errors.nutritionType}
							multi={false}
							touched={touched.nutritionType}
							options={typeOptions}
						/>

						<SpecialSelect
							id="Apropriada para"
							value={values.topics}
							onChange={setFieldValue}
							onBlur={setFieldTouched}
							error={errors.topics}
							multi={true}
							touched={touched.topics}
							options={SelectOptions}
						/>

						<Card>
							<CardHeader
								title="Descrição de nutrientes"
								avatar={foodIcon}
							/>
							<CardText>
								<Editor
									editorState={editorState}
									wrapperClassName="demo-wrapper"
									editorClassName="demo-editor"
									onEditorStateChange={this.onEditorStateChange}
								/>
							</CardText>
						</Card>
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			/>
			</div>
		)
	}
}

export default MyAmazingForm;