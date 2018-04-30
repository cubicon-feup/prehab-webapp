import Yup from "yup";
import SpecialSelect from "./selectComp";
import { withFormik, Field, Form } from 'formik';
import React, { Component } from "react";

import {foodIcon} from "../../../images/foodIcon.svg";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import { EditorState, convertToRaw } from 'draft-js';
import Select from 'react-select';


const SelectOptions = [
	{ value: 1, label: "Diabético"},
	{ value: 2, label: "Insuficiente Renal"},
	{ value: 3, label: "Desnutrido"},
	{ value: 4, label: "Vegetariano"},
	{ value: 5, label: "Hepático"},
	{ value: 6, label: "Hipertenso"}
];

const typeOptions = [
	{ value: 1, label: "Pequeno-Almoço"},
	{ value: 2, label: "Refeição Grande"},
	{ value: 3, label: "Lanche"}
];

export const formikEnhancer = withFormik({
	validationSchema: Yup.object().shape({
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
	}),
	mapPropsToValues: ({title, topics, nutritionType, description}) => ({
		title: title || '',
		topics: topics || SelectOptions,
		nutritionType: '',
		description: description || EditorState.createEmpty()
	}),

	handleSubmit: (values, { setSubmitting }) => {
		const payload = {
			...values,
			topics: values.topics.map(t => t.value),
			description: values.description,
			nutritionType: values.nutritionType
		};
		setTimeout(() => {
			alert("Request to DB... Under Development");
			setSubmitting(false);
		}, 1000);
	},

	displayName: 'MyForm',
});


class FormTest extends Component {

	constructor(props){
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			title: '',
		};
	}

	onEditorStateChange = (editorState) => {
		this.props.setFieldValue('description', convertToRaw(editorState.getCurrentContent()));
		this.setState({
			editorState,
		});
	};

	componentDidMount(){
		console.log(this.props);
	}

	render() {
		const {
			values,
			errors,
			touched,
			isSubmitting,
			setFieldValue,
			setFieldTouched,
			handleReset,
			handleChange,
			dirty
		} = this.props;
		const { editorState } = this.state;


		return (
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
					id="Restrições"
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

				<button
					type="button"
					className="outline"
					onClick={handleReset}
					disabled={!dirty || isSubmitting}
				>
					Reset
				</button>
				<button type="submit" disabled={isSubmitting}>
					Submit
				</button>
			</Form>
		);
	}
};

export const MyAmazingForm = formikEnhancer(FormTest);