import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import ApiListContainer from 'qualificame-native/app/containers/ApiListContainer';

import PropTypes from 'prop-types';
import KioskCard from 'qualificame-native/app/components/KioskCard';

import { connect } from "react-redux";
import { fetchKiosks } from 'qualificame-native/app/actions/KioskActions';
import { getKiosks } from 'qualificame-native/app/reducers';
class KiosksContainer extends Component {	

	_renderItems = ({ kiosk }) => (
		<KioskCard 
			title={kiosk.title}
			text={kiosk.text}
			color={kiosk.color}
			onPress={()=>this.props.navigation.navigate('KioskDetailScreen')}
			addHorizontalMargin
		/>
	)

	render() {
		return (
			<ApiListContainer
				data={this.props.kiosks}
				keyExtractor={o => String(o.id)}
				loadData={() => this.props.fetchKiosks}
				onRefresh={() => this.props.fetchKiosks}
				renderItem={this._renderItems}
				header={this.props.header}
				isRefreshing={this.props.isLoading}
				error={String(this.props.error)} 
				footer={this.props.footer}
			/>
		);
	}
}

mapStateToProps = state => ({
	kiosks: getKiosks(state),
})

KiosksContainer.propTypes = {
}

KiosksContainer.defaultProps = {
}

export default connect(mapStateToProps,
	{
		fetchKiosks
	}
)(KiosksContainer);
