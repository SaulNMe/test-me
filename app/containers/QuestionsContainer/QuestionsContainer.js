import React, { useEffect, useReducer } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getKioskById } from 'qualificame-native/app/reducers'
import ApiService from 'qualificame-native/app/services/ApiService';

import { fetchKiosks, updateKiosk } from "qualificame-native/app/actions/KiosksActions";

export default function QuestionsContainer(props) {
	const dispatchHook = useDispatch();
	function reducer(state, action) {
		switch(action.type) {
			case 'SET_STATE':
				return {
					...state,
					[action.prop]: action.payload
				}
			case 'SET_WELCOME_MESSAGE':
				return {
					...state,
					kiosk: {
						...state.kiosk,
						welcome_message: action.payload
					}
				}
			case 'SET_QUESTION_DESCRIPTION':
				return {
					...state,
					[action.prop]: {
						...state[action.prop],
						description: action.payload
					}
				}
			case 'SET_CHOICE_DESCRIPTION': {
				let choices = state[action.prop].slice();
				choices[action.index].description = action.payload;
				return {
					...state,
					[action.prop]: choices
				}
			}
			default:
				break;
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		goodQuestion: {},
		badQuestion: {},
		goodChoices: [],
		badChoices: [],
		initialGoodChoices: [],
		initialBadChoices: [],
		isLoading: true,
		isSaving: false,
		error: '',
		kiosk: useSelector((state) => getKioskById(state, props.kioskId))
	})

	useEffect(() => {
		getQuestions(props.kioskId);
	}, [])

	function setState(prop, payload) {
		dispatch({ type: 'SET_STATE', prop, payload })
	}

	getQuestions = async (kioskId) => {
		try {
			let response = await ApiService.getKioskQuestions(kioskId);
			await Promise.all(response.questions.map(async question => {
				if(question.question_type === 1) {
					setState('goodQuestion', question)
				} else {
					setState('badQuestion', question)
				}
				await this.getChoices(question.id, question.question_type);
			}));
			setState('isLoading', false)
		} catch(e) {
			setState('isLoading', false)
			setState('error', e)
		}
	}

	getChoices = async (questionId, questionType) => {
		try {
			let { choices } = await ApiService.getQuestionChoices(questionId, {filters: 'active=true'});
			for(let i = 0; i < 4; i++) {
				if(!choices[i]) {
					choices[i] = {
						description: '',
						question_id: questionId,
						active: true
					}
				}
			}
			let choicesDescriptions = choices.map(item => item.description);
			if(questionType === 1) {
				setState('goodChoices', choices)
				setState('initialGoodChoices', choicesDescriptions)
			} else {
				setState('badChoices', choices)
				setState('initialBadChoices', choicesDescriptions)
			}
		} catch(e) {
			setState('isLoading', false)
			setState('error', e)
		}
	}

	onInputChange = (text, type, prop, index) => {
		dispatch({
			type,
			prop,
			payload: text,
			index
		})
	}

	onSubmit = async (enabled_questions) => {
		try {
			Keyboard.dismiss();
			setState('isSaving', true)
			dispatchHook(updateKiosk({kiosk: {
				...state.kiosk,
				enabled_questions
			}}))
			await ApiService.updateQuestion(state.goodQuestion);
			await ApiService.updateQuestion(state.badQuestion);
			let goodChoices = state.goodChoices;
			let badChoices = state.badChoices;
			let initialGoodChoices = state.initialGoodChoices;
			let initialBadChoices = state.initialBadChoices;
	
			await Promise.all(goodChoices.map(async (item, index) => {
				if (item.description !== initialGoodChoices[index]) {
					if (item.id)
						await ApiService.updateChoice(item.id, false);
					let newChoice = await ApiService.createQuestionChoice(item.description, state.goodQuestion.id);
					goodChoices[index] = newChoice.choice;
					initialGoodChoices[index] = newChoice.choice.description;
				}
			}));
			await Promise.all(badChoices.map(async (item, index) => {
				if (item.description !== initialBadChoices[index]) {
					if (item.id)
						await ApiService.updateChoice(item.id, false);
					let newChoice = await ApiService.createQuestionChoice(item.description, state.badQuestion.id);
					badChoices[index] = newChoice.choice;
					initialBadChoices[index] = newChoice.choice.description;
				}
			}));
			let obj = {
				isSaving: false,
				goodChoices,
				badChoices,
				initialGoodChoices,
				initialBadChoices
			}
			for(let key in obj){
				setState(key, obj[key])
			}
		} catch (e) {
			Alert.alert('Oops, ocurrió un error', 'Ocurró un error al guardar las preguntas, inténtalo más tarde');
			setState('isSaving', false)
		}
	}
	let questions = [state.goodQuestion, state.badQuestion];
	let choices = { good: state.goodChoices, bad: state.badChoices }
	return (
		<React.Fragment>
		{
			props.children({
				kiosk: state.kiosk,
				questions,
				choices,
				isLoading: state.isLoading,
				error: state.error,
				onInputChange,
				onSubmit,
				isSaving: state.isSaving
			})
		}
		</React.Fragment>
	);
}