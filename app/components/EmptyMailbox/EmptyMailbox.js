import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './EmptyMailboxStyle';

import SubtitleText from 'qualificame-native/app/components/SubtitleText';

export default class EmptyMailbox extends PureComponent {
	render() {
		return (
			<View style={[styles.alignItemsCenter, styles.flex1]}>
				<View style={[styles.imageContainer]}>
					<Image
						source={require('qualificame-native/assets/empty.png')}
						style={styles.imageSize}
						resizeMode='cover'
					/>
					<SubtitleText
						text={this.props.content}
						color='subdued'
						weight='medium'
						align="center"
					/>
				</View>
			</View>
		);
	}
}

	EmptyMailbox.propTypes = {
		content: PropTypes.string,
	}

	EmptyMailbox.defaultProps = {
		content: 'Aún no has recibido ningún mensaje a buzón',
	}
