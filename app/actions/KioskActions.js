import normalizeById from 'qualificame-native/app/utils/NormalizeById';

export const FETCH_KIOSKS_BEGIN = 'FETCH_KIOSKS_BEGIN';
export const FETCH_KIOSKS_SUCCESS = 'FETCH_KIOSKS_SUCCESS';
export const FETCH_KIOSKS_FAILURE = 'FETCH_KIOSKS_FAILURE';

export function fetchKiosks() {
	return async dispatch => {
		dispatch(getKiosksBegin());
		// await SomeApiService.getUserList()
			// .then(
				// result => {
					dispatch(getKiosksSuccess());
				// },
				// error => {
					dispatch(getKiosksFailure());
					// throw ({error: error, message: 'This is a demo error message'});
				// }
			// )
	};
}

export const getKiosksBegin = () => ({
	type: FETCH_KIOSKS_BEGIN
});
export const getKiosksSuccess = kiosks => ({
	type: FETCH_KIOSKS_SUCCESS,
	payload: { kiosks }
});
export const getKiosksFailure = error => ({
	type: FETCH_KIOSKS_FAILURE,
	payload: { error }
});
