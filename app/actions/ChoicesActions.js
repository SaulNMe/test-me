import normalizeById from 'qualificame-native/app/utils/NormalizeById';
import ApiService from 'qualificame-native/app/services/ApiService';

export const ADD_CHOICES = 'ADD_CHOICES';

export function fetchAllChoices () {
	return async (dispatch, getState) => {
		let state = getState();

		// Get questions of all kiosks
		let questions = await Promise.all(state.Kiosks.allIds.map(kioskId =>
			ApiService.getKioskQuestions(kioskId)
		));
		questions = questions.reduce((prev, curr) => prev.concat(curr.questions), []);

		// Get choices of all questions
		let choices = await Promise.all(questions.map(question =>
			ApiService.getQuestionChoices(question.id)
		));
		choices = choices.reduce((prev, curr) => prev.concat(curr.choices), []);

		let normalized = normalizeById(choices);
		dispatch(addChoices(normalized));
		return normalized;
	};
}
export const addChoices = data => ({
	type: ADD_CHOICES,
	payload: { data }
});
