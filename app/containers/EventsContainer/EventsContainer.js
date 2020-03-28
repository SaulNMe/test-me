import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from 'react-query-hooks';
import moment from 'moment';
import PropTypes from 'prop-types';

import { fetchEvents } from "qualificame-native/app/actions/EventsActions";
import { fetchAllChoices } from "qualificame-native/app/actions/ChoicesActions";
import GroupDataByDate from 'qualificame-native/app/utils/GroupDataByDate';

import { getEvents, getEventsGroupedByDay, getEventsSelectedDateRange } from "qualificame-native/app/reducers";

import ApiList from 'qualificame-native/app/containers/ApiListContainer';
import RatingCard from 'qualificame-native/app/components/RatingCard';

export default function EventsList (props) {
	let dispatch = useDispatch();

	let choicesById = useSelector(state => state.Choices.byId);
	let kiosksById = useSelector(state => state.Kiosks.byId);

	let { start_date, end_date } = useSelector(getEventsSelectedDateRange);
	
	let events = useQuery(params => dispatch(fetchEvents({ ...params, start_date, end_date })));
	let choices = useQuery(() => dispatch(fetchAllChoices()));

	let ids = events.result ? events.result.events.map(event => event.id) : []
	let eventsGrouped = useSelector(state => getEventsGroupedByDay(state, ids))

	useEffect(() => {
		if (!events.isLoading) {
			events.refetch({ start_date, end_date });
		}
	}, [start_date]);

	function onRefresh () {
		events.refetch({ start_date, end_date });
		choices.refetch();
	}

	function updateParams ({ result }) {
		return { offset: result.events.length };
	}

	function updateResult (oldResult, newResult) {
		return { events: oldResult.events.concat(newResult.events)};
	}

	function renderItem ({ item }) {
		return <RatingCard
			isFirst={item === eventsGrouped[0]}
			events={item.collection}
			date={item.date}
			kiosks={kiosksById}
			choices={choicesById}
		/>
	}

	return <ApiList
		data={eventsGrouped}
		renderItem={renderItem}
		keyExtractor={o => String(o.date)}
		isLoading={events.isLoading}
		isReloading={events.isReloading}
		onRefresh={onRefresh}
		refreshing={events.isReloading}
		error={events.error}
		events
		ListFooterComponent={props.footer}
		ItemSeparatorComponent={props.itemSeparator}
		emptyEvents
		onEndReached={() => events.fetchMore({ updateParams, updateResult })}
	/>
}
