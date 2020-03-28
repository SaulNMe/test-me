import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './UserDataStyle';
import IconBox from 'qualificame-native/app/components/IconBox';
import Divider from 'qualificame-native/app/components/Divider';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';


export default class UserData extends PureComponent {
	render() {
		return (
			<View style={styles.bgColor}>
				<Divider />
				<View style={[styles.row, styles.baseHorizontalMargin, styles.alignItemsCenter]}>
					<IconBox 
						bgColor="green"
						iconName="user"
					/>
					<View style={[styles.baseLeftMargin, styles.smallVerticalMargin]}>
						<SubtitleText 
							text={this.props.name}
							color="dark"
						/>
						<SubtitleText 
							text={this.props.email}
							color="lightBlack"
							weight="light"
						/>
					</View>
				</View>
					<Divider />
			</View>
		);
	}
}

	UserData.propTypes = {
		name: PropTypes.string,
		email: PropTypes.string
	}

	UserData.defaultProps = {
		name: "",
		email: ""
	}
