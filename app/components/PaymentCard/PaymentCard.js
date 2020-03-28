import React, { PureComponent } from 'react';
import { 
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import CheckItem from 'qualificame-native/app/components/CheckItem';

import styles from './PaymentCardStyle';

export default class PaymentCard extends PureComponent {
	render() {
		let featuresArray = this.props.featuresArray;

		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={[styles.card, styles.flex1, styles.border]}
				activeOpacity={0.8}
			>
				<View style={styles.smallBottomMargin}>
					<Text style={styles.textStyle}>Plan <Text style={[styles.blueText]}>{this.props.planName}</Text></Text>
				</View>
					{this.props.featuresArray.map( (item) => (
						<React.Fragment key={item.key}>
							<CheckItem
								iconColor="green"
								text={item.text}
								textColor={item.color}
							/>
						</React.Fragment>
					))}
			</TouchableOpacity>
		);
	}
}

	PaymentCard.propTypes = {
		onPress: PropTypes.func,
		planName: PropTypes.string,
		featuresArray: PropTypes.array
	}

	PaymentCard.defaultProps = {
		onPress: ()=>{},
		planName: "",
		featuresArray: []
	}
