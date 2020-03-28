import React, { Component } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query-hooks';

import { fetchAlerts, updateAlert } from 'qualificame-native/app/actions/AlertsActions';
import { fetchKiosks } from 'qualificame-native/app/actions/KiosksActions';
import { getAlerts } from 'qualificame-native/app/reducers';

import AlertItem from 'qualificame-native/app/components/AlertItem';
import ApiList from 'qualificame-native/app/containers/ApiListContainer';

import ApiService from 'qualificame-native/app/services/ApiService';
import NavigationService from 'qualificame-native/app/services/NavigationService';

export default function AlertsContainer () {
	let dispatch = useDispatch();
	let alerts = useQuery(params => dispatch(fetchAlerts({...params})));
	
	let allAlerts = useSelector(getAlerts);
	let kiosksById = useSelector(state => state.Kiosks.byId);

	function filterKiosk (kioskId) {
		let kiosk = this.props.kiosks[kioskId];
	}

	function updateParams ({ result }) {
		return { offset: (result ? result.alerts.length : 0) };
	}

	function updateResult (oldResult, newResult) {
		return { alerts: oldResult.alerts.concat(newResult.alerts)};
	}

	async function readAlert(alert){
		let { read } = alert;
		if(!read) dispatch(updateAlert({alert: {id: alert.id, read: true}}));
		NavigationService.navigate('KioskDetailScreen', {item: kiosksById[alert.kiosk_id]});
		dispatch(fetchKiosks());
	}

	function renderItem ({item}) {
		return <AlertItem
			//disabled={item.read}
			onPress={() => readAlert(item)}
			createdAtText={moment.unix(item.created_at).fromNow()}
			title={item.title} 
			description1={item.body}
			// description2={item.description2}
			// description3={item.description3}
			addTopDivider={true}
			// addBottomDivider={item.bottomDiv}
			seen={item.read}
		/>
	}	

	return <ApiList
		data={allAlerts}
		renderItem={renderItem}
		keyExtractor={o => String(o.id)}
		isLoading={useSelector(state => state.Alerts.isLoading)}
		isReloading={alerts.isReloading}
		onRefresh={alerts.refetch}
		refreshing={alerts.isReloading}
		error={alerts.error}
		alerts
		emptyText={'Al parecer todavía no tienes alertas'}
		onEndReached={() => alerts.fetchMore({ updateParams, updateResult })}
	/>
}