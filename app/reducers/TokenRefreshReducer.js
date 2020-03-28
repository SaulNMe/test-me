import {
	SET_REFRESH_TOKEN_FLAGS,
	CLEAR_REFRESH_TOKEN_FLAGS
} from 'qualificame-native/app/actions/AuthActions';

const initialState = {
	isRefreshingToken: false,
	refreshCall: null
};

export default function TokenRefreshReducer (state = initialState, action){
	switch(action.type){
		case SET_REFRESH_TOKEN_FLAGS:
			return {
				...state,
				isRefreshingToken: true,
				refreshCall: action.payload.refreshCall
			}
		case CLEAR_REFRESH_TOKEN_FLAGS:
			return {
				...initialState,
			}
		default:
			return state
	}
};

export const getIsRefreshingToken = state => {
	return state.isRefreshingToken;
}

export const getRefreshCall = state => {
	return state.refreshCall;
}
