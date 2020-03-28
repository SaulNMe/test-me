import normalizeById from 'qualificame-native/app/utils/NormalizeById';
import ApiService from 'qualificame-native/app/services/ApiService';
import { getUserData } from 'qualificame-native/app/reducers';

export const ADD_KIOSKS = 'ADD_KIOSKS';
export const ADD_UPDATED_KIOSK = 'ADD_UPDATED_KIOSK';
export const CLEAR_KIOSKS = 'CLEAR_KIOSKS';
export const KIOSKS_BEGIN = 'KIOSKS_BEGIN';

export function fetchKiosks() {
	return async dispatch => {
		dispatch(kiosksBegin());
		await ApiService.getKiosks()
			.then(
				result => {
					let normalized = normalizeById(result.kiosks);
					dispatch(addKiosks(normalized));
					return normalized;
				},
				error => {
					throw ({error: error, message: 'An error ocurred'});
				}
			)
	};
}

export function updateKiosk({kiosk} = {}) {
	return async dispatch => {
		return ApiService.updateKiosk({kiosk})
			.then(
				result => {
					let normalized = normalizeById([result.kiosk]);
					dispatch(addUpdatedKiosk(normalized));
					return normalized;
				},
				error => {
					throw ({ error, message: 'An error occurred' })
				}
			)
	}
}

export function createKiosk(kiosk = {}) {
	return async (dispatch) => {
		let normalized = normalizeById([kiosk]);
		dispatch(addKiosks(normalized));
		return normalized;
	};
}

export const kiosksBegin = () => ({
	type: KIOSKS_BEGIN,
});

export const clearKiosks = () => ({
	type: CLEAR_KIOSKS,
});
export const addKiosks = data => ({
	type: ADD_KIOSKS,
	payload: { data }
});
export const addUpdatedKiosk = data => ({
	type: ADD_UPDATED_KIOSK,
	payload: { data }
})
