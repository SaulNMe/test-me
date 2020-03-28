import normalizeById from 'qualificame-native/app/utils/NormalizeById';
import ApiService from 'qualificame-native/app/services/ApiService';

// Declare action names as constants with uppercase string
export const ADD_ALERTS = 'ADD_ALERTS';
export const CLEAR_ALERTS = 'CLEAR_ALERTS';
export const ALERTS_BEGIN = 'ALERTS_BEGIN';
export const ADD_UPDATED_ALERT = 'ADD_UPDATED_ALERT';

// Thunk: this is a special type of action that can dispatch other actions
export function fetchAlerts({ limit=25, offset=0 }={}) {
	return async dispatch => {
		dispatch(alertsBegin());
		await ApiService.getAlerts({limit, offset})
			.then(
				result => {
					let normalized = normalizeById(result.alerts);
					dispatch(addAlerts(normalized));
					return normalized;
				},
				error => {
					throw ({error: error, message: 'An error ocurred'});
				}
			)
	};
}

export function updateAlert({alert} = {}) {
	return async dispatch => {
		return ApiService.updateAlert({alert})
			.then(
				result => {
					let normalized = normalizeById([result.alert]);
					dispatch(addUpdatedAlert(normalized));
					return normalized;
				},
				error => {
					throw ({ error, message: 'An error occurred' })
				}
			)
	}
}

export const alertsBegin = () => ({
	type: ALERTS_BEGIN,
})
export const clearAlerts = () => ({
	type: CLEAR_ALERTS,
});
export const addAlerts = data => ({
	type: ADD_ALERTS,
	payload: { data }
});
export const addUpdatedAlert = data => ({
	type: ADD_UPDATED_ALERT,
	payload: { data }
})
