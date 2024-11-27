import * as React from 'react'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import {isEmpty} from "ucshared";

import Page from '../../components/Page'
import Container from '../../components/Container'
import AdminLayout from "../../layouts/admin";

interface IQuestionFormProps {
	otherQuestions: Api.SurveyQuestion[];
	onChange: (value: Api.SurveyQuestion) => any;
}

class QuestionForm extends React.Component<IQuestionFormProps, Api.SurveyQuestion>{
	constructor(props, context) {
		super(props, context);
		this.state = {
			questionText: '',
			questionShowIfAnswer: '',
			questionShowIf: '',
			questionId: '',
			questionType: '',
			isRequired: false,
		};
	}

	public changed() {
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(this.state);
		}
	}

	public render() {
		const otherQuestions = (this.props.otherQuestions || []).map((q) => (
			{ value: q.questionId || '', label: q.questionText || q.questionId || ''}
		)).filter((q) => q.value.length > 0 && q.label.length > 0);

		return (
			<div>
				{EditFormBase.boundChoices(
					'Item Type',
					['Heading', 'Text', 'Yes/No', 'Choice'],
					this.state.questionType || '',
					(questionType) => this.setState({questionType}, () => this.changed()))
				}
				{EditFormBase.boundTextboxValue(
					'Display Text',
					this.state.questionText || '',
					(questionText) => this.setState({questionText}, () => this.changed()))
				}
				{this.state.questionType !== 'Heading' && (
					<div>
						{EditFormBase.boundChoices(
							'Show If This Question...',
							otherQuestions,
							this.state.questionShowIf || '',
							(questionShowIf) => this.setState({questionShowIf}, () => this.changed()))
						}
						{EditFormBase.boundTextboxValue(
							'has this value',
							this.state.questionShowIfAnswer || '',
							(questionShowIfAnswer) => this.setState({questionShowIfAnswer}, () => this.changed()),
							'',
							false,
							isEmpty(this.state.questionShowIf)
						)}
						{EditFormBase.boundCheckboxValue(
							'Required?',
							this.state.isRequired || false,
							(isRequired) => this.setState({isRequired}))
						}
					</div>
				)}
			</div>
		);
	}
}

class ManageQuestions extends React.Component<any, {
	data: Api.SurveyQuestion[],
	newQuestion: Api.SurveyQuestion,
	selectedQuestion: Api.SurveyQuestion|null,
}> {

	constructor(props, context) {
		super(props, context);
		this.state = {
			data: [],
			selectedQuestion: null,
			newQuestion: {
				questionText: '',
				questionShowIf: '',
				questionShowIfAnswer: '',
				isRequired: false,
			},
		};
	}

	public componentDidMount() {
		console.log('welcome', this.props.location.search);
		new Api.QuestionApi().getQuestions().then((data) => {
			console.log('got', data);
			this.setState({data});
		});
	}

	public UNSAFE_componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	public render() {
		return (
			<AdminLayout>
				<Page>
					<Container>
						<h1>Manage Questions</h1>
						<table>
							<thead>
							<tr>
								<th>Item ID</th>
								<th>Display Text</th>
								<th>Type</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{this.state.data.map((row, i) => (
								<tr key={(row.questionId || '') + i}>
									<td>{row.questionId}</td>
									<td>{row.questionText}</td>
									<td>{row.questionType}</td>
									<td>
										{/*<Link to={`${this.props.location.pathname}?id=${row.questionId}`}>Edit</Link>*/}
										<button>Delete</button>
										<button>↑</button>
										<button>↓</button>
									</td>
								</tr>
							))}
							</tbody>
						</table>

						<h3>New Question</h3>
						<QuestionForm
							onChange={(newQuestion) => this.setState({newQuestion})}
							otherQuestions={this.state.data}
						/>
					</Container>
				</Page>
			</AdminLayout>
		);
	}
}

export default ManageQuestions
