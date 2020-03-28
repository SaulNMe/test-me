import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query-hooks';

import PropTypes from 'prop-types';
import moment from 'moment';

import KioskCard from 'qualificame-native/app/components/KioskCard';

import NavigationService from 'qualificame-native/app/services/NavigationService';
import ApiList from 'qualificame-native/app/containers/ApiListContainer';

import { fetchReports } from "qualificame-native/app/actions/ReportsActions";
import { getReports, getKiosks, getUserData } from "qualificame-native/app/reducers";

import SwitchColor from 'qualificame-native/app/utils/SwitchColor';

export default function ReportsList (props) {
	function renderItem ({ item }) {
		return <KioskCard
			color={SwitchColor(item.result_tag, false)}
			excellent={item.total_excellent}
			average={item.total_average}
			bad={item.total_bad}
			awful={item.total_awful}
			title={filterKiosk(item.kiosk_id)}
			percent={item.result}
			text={`${formatDate(item.start_datetime)} - ${formatDate(item.end_datetime)}`}
			addHorizontalMargin
			iconName='calendar'
			onPress={() => NavigationService.navigate('ReportDetailScreen', {item})}

		/>
	}

	function filterKiosk (kioskId) {
		 return kiosksById[kioskId] ? kiosksById[kioskId].name : '--'
	}

	function formatDate (date) {
		return moment(date).format('MMMM D');
	}
	

	let dispatch = useDispatch();
	let reports = useQuery(() => dispatch(fetchReports()));

	let allReports = useSelector(getReports);
	let kiosksById = useSelector(state => state.Kiosks.byId);
	let kiosksAllIds = useSelector(state => state.Kiosks.allIds);
	let { userData } = useSelector(getUserData);

	return <ApiList
		data={allReports}
		username={userData.first_name ? userData.first_name : ''}
		renderItem={renderItem}
		keyExtractor={o => String(o.id)}
		isLoading={useSelector(state => state.Reports.isLoading)}
		isReloading={reports.isReloading}
		onRefresh={reports.refetch}
		refreshing={reports.isReloading}
		error={reports.error}
		card
		ListFooterComponent={props.footer}
		emptyText={kiosksAllIds.length == 0 ? 'Al parecer todavía no tienes ningun kiosko, crea uno para poder generar un reporte' : 'Todavía no tienes reportes. Presiona el botón para crear uno'}
		color='blue'
	/>
}
