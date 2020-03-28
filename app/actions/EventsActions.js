import normalizeById from 'qualificame-native/app/utils/NormalizeById';
import ApiService from 'qualificame-native/app/services/ApiService';
import { getEventsSelectedDateRange } from 'qualificame-native/app/reducers';

export const ADD_EVENTS = 'ADD_EVENTS';
export const SET_SELECTED_MONTH = 'SET_SELECTED_MONTH';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';


export function fetchEvents ({ limit=25, offset=0, start_date, end_date } = {}) {
	return async (dispatch, getState) => {
		return ApiService.getEvents({ limit, offset, start_date, end_date })
			.then(
				result => {
					let normalized = normalizeById(result.events);
					dispatch(addEvents(normalized));
					return result;
				},
				error => {
					throw ({error: error, message: 'Unable to fetch events'});
				}
			)
	};
}

export function selectMonthAndReload(month) {
	return async (dispatch, getState) => {
		dispatch(setSelectedMonth(month));
	}
}

export const clearEvents = () => ({
	type: CLEAR_EVENTS,
})

export const setSelectedMonth = month => ({
	type: SET_SELECTED_MONTH,
	payload: { month }
});

export const addEvents = data => ({
	type: ADD_EVENTS,
	payload: { data }
});
