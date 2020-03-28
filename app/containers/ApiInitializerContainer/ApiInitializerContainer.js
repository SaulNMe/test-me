import React, { useEffect } from 'react';
import { qualificameApiAxios, qualificameAuthAxios } from "qualificame-native/app/utils/Axios";
import { useStore } from 'react-redux';
import { getAuthData }  from 'qualificame-native/app/reducers';
import { suscribeForRefreshAuth } from 'qualificame-native/app/actions/AuthActions';
import ChannelConfig from 'qualificame-native/config/Constants';

export default function ApiInitializerContainer (props) {
	const store = useStore();
	const { API_HOST } = ChannelConfig;

	useEffect(() => {
		//Seting up axios instances
		qualificameApiAxios.interceptors.request.use(request => {
			let tokenData = getAuthData(store.getState());
			let accessToken = tokenData.access_token;
			request.headers['Authorization'] = `Bearer ${accessToken}`;
			request.baseURL = API_HOST;
			return request;
		});

		qualificameAuthAxios.interceptors.request.use(request => {
			const state = store.getState();
			request.baseURL = API_HOST;
			return request;
		});		

		//Setting up refresh tokens
		qualificameApiAxios.interceptors.response.use(response => response, async error => {
			const status = error.response ? error.response.status : null;
			if (status === 401) {
				await store.dispatch(suscribeForRefreshAuth());
				return qualificameApiAxios(error.config);
			}
			return Promise.reject(error);
		});
	}, [])

	return (props.children);
}
