import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TinyText from 'qualificame-native/app/components/TinyText';
import Divider from 'qualificame-native/app/components/Divider';
import { Colors} from 'qualificame-native/app/styles';

import styles from './TextDividerStyle';

export default class TextDivider extends PureComponent {
	render() {
		return (
			<View style={[styles.row, styles.alignItemsCenter, (this.props.addHorizontalMargin && styles.baseHorizontalMargin), (this.props.addVerticalMargin && styles.baseVerticalMargin) ]}>
				<View style={styles.flex1}>
					<Divider color={this.props.color} />
				</View>
				<View style={[styles.alignItemsCenter, styles.smallHorizontalMargin]}>
					<TinyText 
						text={this.props.text}
						color={this.props.color}
					/>
				</View>
				<View style={styles.flex1}>
					<Divider color={this.props.color} />
				</View>
			</View>
		);
	}
}

	TextDivider.propTypes = {
		text: PropTypes.string,
		color: PropTypes.string,
		addHorizontalMargin: PropTypes.bool,
		addVerticalMargin: PropTypes.bool
	}

	TextDivider.defaultProps = {
		text: '',
		color: 'white',
		addHorizontalMargin: false,
		addVerticalMargin: false
	}
