import ApiService from 'qualificame-native/app/services/ApiService';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import NavigationService from 'qualificame-native/app/services/NavigationService';
import { Alert } from 'react-native';
import { clearKiosks } from 'qualificame-native/app/actions/KiosksActions';
import { clearReports } from 'qualificame-native/app/actions/ReportsActions';
import { clearEvents } from 'qualificame-native/app/actions/EventsActions';
import { clearAlerts } from 'qualificame-native/app/actions/AlertsActions';
import { getAuthData, getIsRefreshingToken, getRefreshCall } from 'qualificame-native/app/reducers';

export const AUTH_DATA_BEGIN = 'AUTH_DATA_BEGIN';
export const AUTH_DATA_FAILURE = 'AUTH_DATA_FAILURE';
export const ADD_AUTH_DATA = 'ADD_AUTH_DATA';
export const ADD_USER_DATA = 'ADD_USER_DATA';
export const UPDATE_AUTH_DATA = 'UPDATE_AUTH_DATA';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const SET_REFRESH_TOKEN_FLAGS = 'SET_REFRESH_TOKEN_FLAGS';
export const CLEAR_REFRESH_TOKEN_FLAGS = 'CLEAR_REFRESH_TOKEN_FLAGS';

const registerDevice = () => {
	return async dispatch => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
	if (finalStatus !== 'granted') {
			return;
		}
		let token = await Notifications.getExpoPushTokenAsync();
		ApiService.registerDevice(token).catch(() => alert('Unable to register device'));
	}
}

export function login(loginCredentials) {
	return async dispatch => {
		dispatch(authDataBegin());
		await ApiService.login(loginCredentials)
			.then(
				result => {
					dispatch(addAuthData(result));
					dispatch(fetchUser())
				},
				error => {
					dispatch(authDataFailure());
					Alert.alert('Credenciales inválidas', 'Tu correo o contraseña son incorrectos');
					// throw ({error: error, message: 'An error ocurred'});
				}
			)
	};
};

export function fetchUser() {
	return async dispatch => {
		await ApiService.getUser()
			.then(
				result => {
					dispatch(addUserData(result.user));
					dispatch(registerDevice());
				},
				error => {
					dispatch(authDataFailure());
					Alert.alert('¡Oops! Ocurrió un error', 'Vuelve a intentarlo más tarde');
					// throw ({error: error, message: 'An error ocurred'});
				}
			)
		NavigationService.navigate('AuthLoading');
	}
};

export function refreshAuth() {
	return async (dispatch, getState) => {
		let tokenData = getAuthData(getState());
		let refreshToken = tokenData.refresh_token;
		return ApiService.getNewToken(refreshToken)
			.then(
				result => {
					dispatch(updateAuthData(result));
				},
				error => {
					dispatch(logout());
					throw ({error: error, message: 'No se logró actualizar la sesión'});
				}
			)
	};
}

export function suscribeForRefreshAuth() {
	return async (dispatch, getState) => {
		if(getIsRefreshingToken(getState())) {
			await getRefreshCall(getState());
		} else {
			const refreshPromise = dispatch(refreshAuth());
			dispatch(setRefreshTokenFlags(refreshPromise));
			await refreshPromise;
			dispatch(clearRefreshTokenFlags())
		}
	};
}

export function logout() {
	return async dispatch => {
		dispatch(clearAlerts());
		dispatch(clearKiosks());
		dispatch(clearSession());
		dispatch(clearReports());
		dispatch(clearAlerts());
	}
};

export const authDataBegin = () => ({
	type: AUTH_DATA_BEGIN,
});

export const authDataFailure = () => ({
	type: AUTH_DATA_FAILURE,
});

export const addAuthData = authData => ({
	type: ADD_AUTH_DATA,
	payload: authData
});

export const addUserData = userData => ({
	type: ADD_USER_DATA,
	payload: {userData}
});

export const clearSession = () => ({
	type: CLEAR_AUTH
});

export const updateAuthData = authData => ({
	type: UPDATE_AUTH_DATA,
	payload: { authData }
})

export const setRefreshTokenFlags = refreshCall => ({
	type: SET_REFRESH_TOKEN_FLAGS,
	payload: { refreshCall }
});

export const clearRefreshTokenFlags = () => ({
	type: CLEAR_REFRESH_TOKEN_FLAGS,
});