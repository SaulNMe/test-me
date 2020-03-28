import { 
	ADD_EVENTS,
	SET_SELECTED_MONTH,
	CLEAR_EVENTS
} from 'qualificame-native/app/actions/EventsActions';
import GroupDataByDate from 'qualificame-native/app/utils/GroupDataByDate';
import moment from 'moment';

const initialState = {
	byId: {},
	allIds: [],
	selectedMonth: moment().format() 
};

export default function EventsReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_EVENTS:
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
		case SET_SELECTED_MONTH:
			return {
				...state,
				selectedMonth: action.payload.month
			}
		case CLEAR_EVENTS: 
			return {
				...state,
				byId: {},
				allIds: [],
			}
		default:
			return state;
	}
};

export const getEvents = state => {
	return state.allIds.map(id => state.byId[id]);
}

export const getEventsGroupedByDay = (state, ids) => {
	return GroupDataByDate({
 		allIds: ids,
 		byId: state.byId
		
	})
}

export const getSelectedMonth = state => {
	return state.selectedMonth;
}

export const getEventsSelectedDateRange = state => {
	let start_date = moment(state.selectedMonth).startOf('month').format('YYYY-MM-DD');
	let end_date = moment(state.selectedMonth).endOf('month').format('YYYY-MM-DD');
	return { start_date, end_date }
}
