import {
	ADD_AUTH_DATA,
	CLEAR_AUTH,
	ADD_USER_DATA,
	AUTH_DATA_BEGIN,
	AUTH_DATA_FAILURE,
	UPDATE_AUTH_DATA
} from 'qualificame-native/app/actions/AuthActions';

const initialState = {
	access_token: '',
	token_type: '',
	refresh_token: '',
	loggedIn: false,
	userData: {},
	isLoading: false,
};

export default function AuthReducer (state = initialState, action) {
	switch (action.type) {
		case AUTH_DATA_BEGIN: 
			return {
				...state,
				isLoading: true
			}
		case AUTH_DATA_FAILURE: 
			return {
				...state,
				isLoading: false
			}
		case ADD_AUTH_DATA:
			return {
				...state,
				access_token: action.payload.access_token,
				token_type: action.payload.token_type,
				refresh_token: action.payload.refresh_token,
			}
		case CLEAR_AUTH:
			return {
				...initialState,
			}
		case ADD_USER_DATA:
			return {
				...state,
				userData: action.payload.userData,
				loggedIn: true,
				isLoading: false
			}
		case UPDATE_AUTH_DATA:
			return {
				...state,
				...action.payload.authData,
			}
		default:
			return state;
	}
};

export const getIsLoggedIn = state => {
	return state.loggedIn
}

export const getAuthData = state => {
	return {
		access_token: state.access_token,
		token_type: state.token_type,
		refresh_token: state.refresh_token,
		loggedIn: state.loggedIn,
	}
}

export const getUserData = state => {
	return {
		userData: state.userData
	}
}

export const getIsLoading = state => {
	return state.isLoading
}

