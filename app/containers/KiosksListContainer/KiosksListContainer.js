import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from 'react-query-hooks';

import PropTypes from 'prop-types';

import ApiList from 'qualificame-native/app/containers/ApiListContainer';
import NavigationService from 'qualificame-native/app/services/NavigationService';

import { fetchKiosks } from "qualificame-native/app/actions/KiosksActions";
import { getKiosks, getUserData } from "qualificame-native/app/reducers";

import KioskCard from 'qualificame-native/app/components/KioskCard';
import SwitchColor from 'qualificame-native/app/utils/SwitchColor';

export default function KiosksList (props) {
	let dispatch = useDispatch();
	let kiosks = useQuery(() => dispatch(fetchKiosks()));

	let allKiosks = useSelector(getKiosks);
	let { userData } = useSelector(getUserData);

	function renderItem ({ item }) {
		return <KioskCard
			excellent={item.total_excellent}
			average={item.total_average}
			bad={item.total_bad}
			awful={item.total_awful}
			title={item.name}
			percent={item.result}
			text={String(item.total_events + ' eventos')}
			onPress={() => NavigationService.navigate('KioskDetailScreen', {item})}
			addHorizontalMargin
			color={SwitchColor(item.result_tag, false)}
		/>
	}

	return <ApiList
		data={allKiosks}
		username={userData.first_name ? userData.first_name : ''}
		renderItem={renderItem}
		keyExtractor={o => String(o.id)}
		isLoading={useSelector(state => state.Kiosks.isLoading)}
		isReloading={kiosks.isReloading}
		onRefresh={kiosks.refetch}
		refreshing={kiosks.isReloading}
		card
		error={kiosks.error}
		ListFooterComponent={props.footer}
		emptyText='Para comenzar a utilizar Qualifícame, agrega un nuevo Kiosko'
		color='green'
	/>
}
