import normalizeById from 'qualificame-native/app/utils/NormalizeById';
import ApiService from 'qualificame-native/app/services/ApiService';

// Declare action names as constants with uppercase string
export const ADD_REPORTS = 'ADD_REPORTS';
export const CLEAR_REPORTS = 'CLEAR_REPORTS';
export const REPORTS_BEGIN = 'REPORTS_BEGIN';

// Thunk: this is a special type of action that can dispatch other actions
export function fetchReports() {
	return async dispatch => {
		dispatch(reportsBegin());
		await ApiService.getReports()
			.then(
				result => {
					let normalized = normalizeById(result.reports);
					dispatch(addReports(normalized));
					return normalized;
				},
				error => {
					throw ({error: error, message: 'An error ocurred'});
				}
			)
	};
}
export const reportsBegin = () => ({
	type: REPORTS_BEGIN,
});

export const clearReports = () => ({
	type: CLEAR_REPORTS,
});
export const addReports = data => ({
	type: ADD_REPORTS,
	payload: { data }
});
