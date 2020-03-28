import React, { Component } from 'react';
import {
	FlatList,
	RefreshControl,
	View
} from 'react-native';

import PropTypes from 'prop-types';
import { color } from 'qualificame-native/app/styles';
import ListEmptyState from 'qualificame-native/app/components/ListEmptyState';
import ListErrorState from 'qualificame-native/app/components/ListErrorState';
import EmptyMailbox from 'qualificame-native/app/components/EmptyMailbox';
import ShimmerCard from 'qualificame-native/app/components/ShimmerCard';
import ShimmerEvents from 'qualificame-native/app/components/ShimmerEvents';
import ShimmerAlert from 'qualificame-native/app/components/ShimmerAlert';


export default function ApiList (props) {
	return (
		<FlatList
			{...props}
			ListEmptyComponent={() =>{
				if (props.error) return <ListErrorState text={props.errorText}/>;
				if (props.isLoading) {
					if(props.events) return <ShimmerEvents/> 
					if(props.card) return [1,2,3,4].map((x)=> <View key={x}><ShimmerCard /></View>) 
					if(props.alerts) return [1,2,3,4].map((x)=> <View key={x}><ShimmerAlert /></View>) 
					return <ListEmptyState text={"Loading..."}/> 
				}
				if (!props.isReloading)
					if(props.emptyEvents) return <EmptyMailbox/>
					else return <ListEmptyState text={props.emptyText} color={props.color} username={props.username}/>;
					return null
			}}
		/>
	);
}

ApiList.propTypes = {
	username: PropTypes.string,
	text: PropTypes.string,
	// data: PropTypes.array,
	// keyExtractor: PropTypes.func,
	// error: PropTypes.string,
	// isRefreshing: PropTypes.bool,
	// loadData: PropTypes.func.isRequired,
	// renderItem: PropTypes.func.isRequired,
	// onRefresh: PropTypes.func,
	// onEndReached: PropTypes.func,
}

ApiList.defaultProps = {
	username: '',
	text:''
	// data: [],
	// error: '',
	// isRefreshing: false,
	// onEndReached: () => {},
	// onRefresh: () => {},
}
