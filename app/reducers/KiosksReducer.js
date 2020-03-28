// // Action names should be imported from their respective action modules
import {
	ADD_KIOSKS,
	ADD_UPDATED_KIOSK,
	CLEAR_KIOSKS,
	KIOSKS_BEGIN,
} from 'qualificame-native/app/actions/KiosksActions';

// Example initial state
const initialState = {
	byId: {},
	allIds: [],
	isLoading: false,
};

// Return a new state object with updated attributes
export default function KiosksReducer (state = initialState, action) {
	switch (action.type) {
		case KIOSKS_BEGIN: 
			return {
				...state,
				isLoading: true
			}
		case ADD_KIOSKS:
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
		case ADD_UPDATED_KIOSK: {
			let { data } = action.payload;
			return {
				...state,
				byId: {
					...state.byId,
					[data.allIds[0]]: data.byId[data.allIds[0]]
				}
			};
		}
		case CLEAR_KIOSKS:
			return {
				...state,
				byId: {},
				allIds: [],
			}
		default:
			return state;
	}
};

export const getKiosks = state => {
	return state.allIds.map( id => state.byId[id] );
}

export const getKioskById = (state, kioskId) => {
	return state.byId[kioskId];
}

export const getIsLoadingKiosks =  state => {
	return state.isLoading;
}

export const getErrorKiosks =  state => {
	return state.error;
}
