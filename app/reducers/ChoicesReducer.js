// // Action names should be imported from their respective action modules
import {
	ADD_CHOICES,
} from 'qualificame-native/app/actions/ChoicesActions';

// Example initial state
const initialState = {
	byId: {},
	allIds: []
};

// Return a new state object with updated attributes
export default function ChoicesReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_CHOICES:
			let allIds = [...new Set(state.allIds.concat(action.payload.data.allIds))];
			let byId = {
				...state.byId,
				...action.payload.data.byId
			};
			return {
				...state,
				allIds,
				byId,
			};
		default:
			return state;
	}
};

export const getChoiceById = (state, choiceId) => {
	return state.byId[choiceId];
}
