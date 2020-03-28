import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './RatingCardStyle';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import RatingItem from 'qualificame-native/app/components/RatingItem';

export default class RatingCard extends Component {

	filterKiosk = kioskId => {
		let kiosk = this.props.kiosks[kioskId];
		return kiosk ? kiosk.name : '- -';
	}

	filterChoice = choiceId => {
		let choice = this.props.choices[choiceId];
		return choice ? choice.description : '- -';
	}

	render() {
		return (
			<View style={[styles.baseLeftMargin, styles.baseBottomMargin, (this.props.isFirst ? styles.baseTopMargin: null)]}>
				<SubtitleText
					text={(moment(this.props.date).format('dddd DD')).toUpperCase()}
					color="orange"
				/>
				<View style={[styles.smallLeftMargin]}>
					{
						this.props.events.map(event => (
							<View style={[styles.baseTopMargin]} key={event.id}>
								<RatingItem
									time={moment.unix(event.created_at).format('HH:mm')}
									value={event.value}
									title={this.filterKiosk(event.kiosk_id)}
									comment={this.filterChoice(event.choice_id)}
								/>
							</View>
						))
					}
				</View>
			</View>
		);
	}
}

	RatingCard.propTypes = {
		title: PropTypes.string,
		// data: PropTypes.array
	}

	RatingCard.defaultProps = {
		// data: []
	}
