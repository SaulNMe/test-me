// // Action names should be imported from their respective action modules
import {
	ADD_ALERTS,
	ADD_UPDATED_ALERT,
	CLEAR_ALERTS,
	ALERTS_BEGIN,
} from 'qualificame-native/app/actions/AlertsActions';

// Example initial state
const initialState = {
	byId: {},
	allIds: [],
	isLoading: false,
	error: ''
};

// Return a new state object with updated attributes
export default function ChoicesReducer (state = initialState, action) {
	switch (action.type) {
		case ALERTS_BEGIN: 
			return {
				...state,
				isLoading: true
			}
		case ADD_ALERTS:
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
		case ADD_UPDATED_ALERT: {
			let { data } = action.payload;
			return {
				...state,
				byId: {
					...state.byId,
					[data.allIds[0]]: data.byId[data.allIds[0]]
				}
			};
		}
		case CLEAR_ALERTS:
			return {
				...state,
				byId: {},
				allIds: [],
			}
		default:
			return state;
	}
};

export const getAlerts = state => {
	return state.allIds.map( id => state.byId[id] );
}

export const unReadAlerts = state => {
	return state.allIds.filter( id => state.byId[id].read === false).length
}
