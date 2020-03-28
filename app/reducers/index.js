import Events, * as fromEvents from 'qualificame-native/app/reducers/EventsReducer.js';
import Auth, * as fromAuth from 'qualificame-native/app/reducers/AuthReducer.js';
import TokenRefresh, * as fromTokenRefresh from 'qualificame-native/app/reducers/TokenRefreshReducer.js'
import Kiosks, * as fromKiosks from 'qualificame-native/app/reducers/KiosksReducer.js';
import Reports, * as fromReports from 'qualificame-native/app/reducers/ReportsReducer.js';
import Choices, * as fromChoices from 'qualificame-native/app/reducers/ChoicesReducer.js';
import Alerts, * as fromAlerts from 'qualificame-native/app/reducers/AlertsReducer.js';

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    Auth,
    TokenRefresh,
    Kiosks,
    Reports,
    Events,
    Choices,
    Alerts,
});

export default rootReducer;

//Auth
export const getIsLoggedIn = state =>
	fromAuth.getIsLoggedIn(state.Auth);

export const getIsLoading = state =>
	fromAuth.getIsLoading(state.Auth);

export const getAuthData = state =>
	fromAuth.getAuthData(state.Auth);

export const getUserData = state =>
	fromAuth.getUserData(state.Auth);

//Token Refresh
export const getIsRefreshingToken = state =>
	fromTokenRefresh.getIsRefreshingToken(state.TokenRefresh);

export const getRefreshCall = state =>
	fromTokenRefresh.getRefreshCall(state.TokenRefresh);

//Kiosks
export const getKiosks = state =>
	fromKiosks.getKiosks(state.Kiosks);

export const getKioskById = (state, kioskId) =>
	fromKiosks.getKioskById(state.Kiosks, kioskId)

export const getIsLoadingKiosks = state =>
	fromKiosks.getIsLoadingKiosks(state.Kiosks);

export const getErrorKiosks = state =>
	fromKiosks.getErrorKiosks(state.Kiosks);

//Reports

export const getReports = state =>
	fromReports.getReports(state.Reports);

export const getIsLoadingReports = state =>
	fromReports.getIsLoadingReports(state.Reports);
export const getErrorReports = state =>
	fromReports.getErrorReports(state.Reports);

// Events
export const getEvents = state =>
	fromEvents.getEvents(state.Events);

export const getEventsGroupedByDay = (state, ids) =>
	fromEvents.getEventsGroupedByDay(state.Events, ids);

export const getSelectedMonth = state => 
	fromEvents.getSelectedMonth(state.Events);

export const getEventsSelectedDateRange = state => 
	fromEvents.getEventsSelectedDateRange(state.Events);

// Choices
export const getChoices = state =>
	fromChoices.getChoiceById(state.Choices);

// Alerts 
export const getAlerts = state =>
	fromAlerts.getAlerts(state.Alerts);

export const unReadAlerts = state =>
	fromAlerts.unReadAlerts(state.Alerts);