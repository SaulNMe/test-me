// // Action names should be imported from their respective action modules
import {
	ADD_REPORTS,
	CLEAR_REPORTS,
	REPORTS_BEGIN,
} from 'qualificame-native/app/actions/ReportsActions';

// Example initial state
const initialState = {
	byId: {},
	allIds: [],
	isLoading: false
};

// Return a new state object with updated attributes
export default function ReportsReducer (state = initialState, action) {
	switch (action.type) {
		case REPORTS_BEGIN:
			return {
				...state,
				isLoading: true
			}
		case ADD_REPORTS:
			let allIds = [...new Set(state.allIds.concat(action.payload.data.allIds))];
			let byId = {
				...state.byId,
				...action.payload.data.byId
			};
			return {
				...state,
				allIds,
				byId,
				isLoading: false,
			};
		case CLEAR_REPORTS:
			return {
				...state,
				byId: {},
				allIds: [],
			}
		default:
			return state;
	}
};

export const getReports = state => {
	return state.allIds.map( id => state.byId[id] );
}

export const getIsLoadingReports = state => {
	return state.isLoading
}
