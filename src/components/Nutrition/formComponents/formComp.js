import Yup from "yup";
import SpecialSelect from "./selectComp";
import { withFormik } from 'formik';
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
		type: Yup.string()
			.required('Escolher Tipo!'),
	}),
	mapPropsToValues: props => ({
		title: '',
		topics: SelectOptions,
		type: typeOptions,
		description: EditorState.createEmpty()
	}),

	handleSubmit: (values, { setSubmitting }) => {
		const payload = {
			...values,
			topics: values.topics.map(t => t.value),
			description: values.description
		};
		setTimeout(() => {
			alert(JSON.stringify(payload, null, 2));
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
			restrictions: [],
			type: ''
		};
	}

	handleChange = (type) => {
		this.setState({ type });
	}

	onEditorStateChange = (editorState) => {
		this.props.setFieldValue('description', convertToRaw(editorState.getCurrentContent()));
		this.setState({
			editorState,
		});
	};


	render() {
		const {
			values,
			touched,
			dirty,
			errors,
			handleChange,
			handleBlur,
			handleSubmit,
			handleReset,
			setFieldValue,
			setFieldTouched,
			isSubmitting,
		} = this.props;
		const { editorState, type } = this.state;

		return (
			<form onSubmit={handleSubmit}>
				<label htmlFor="title" style={{ display: 'block' }}>
					Titulo
				</label>
				<input
					id="title"
					placeholder="Inserir Titulo"
					type="text"
					value={values.title}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				{errors.title &&
				touched.title && (
					<div style={{ color: 'red', marginTop: '.5rem' }}>
						{errors.title}
					</div>
				)}

				<div style={{ margin: '1rem 0' }}>
					<label htmlFor="color">
						Tipo de Refeição
					</label>
					<Select
						name="type"
						options={typeOptions}
						multi={false}
						onChange={this.handleChange}
						value={type}

					/>
					{errors.type &&
					touched.type && (
						<div style={{ color: 'red', marginTop: '.5rem' }}>
							{errors.type}
						</div>
					)}
				</div>

				<SpecialSelect
					value={values.topics}
					onChange={setFieldValue}
					onBlur={setFieldTouched}
					error={errors.topics}
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
			</form>
		);
	}
};

export const MyAmazingForm = formikEnhancer(FormTest);