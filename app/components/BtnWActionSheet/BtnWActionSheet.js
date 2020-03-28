import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import BodyText from 'qualificame-native/app/components/BodyText';
import moment from 'moment';
import styles from './BtnWActionSheetStyle';
import ActionSheet from 'react-native-actionsheet'
import { Feather } from '@expo/vector-icons';

export default class BtnWActionSheet extends Component {

	showActionSheet = () => this.actionSheet.show();

	render() {
		return (
			<View>
				<TouchableOpacity
					style={[styles.containerTransp, styles.row, styles.centerObjects]}
					activeOpacity={0.6}
					onPress={this.showActionSheet}
				>
					<BodyText 
						text={this.props.text}
						color="white"
					/>
					<View style={styles.baseLeftMargin}>
						<Feather 
							name={this.props.iconName}
							size={24} style={styles.transparent}
						/>
					</View>
				</TouchableOpacity>
				<ActionSheet
					ref={o => this.actionSheet = o}
					options={this.props.items.concat('Cancel')}
					style={{
						buttonBox: {...styles.buttonBox},
						cancelButtonBox: {...styles.cancelButtonBox},
						body: {...styles.body}
					}}
					cancelButtonIndex={this.props.items.length}
					destructiveButtonIndex={this.props.items.length}
					onPress={(index) =>{
						if (index === this.props.items.length) return;
						this.props.onSelect(index);
					}}
				/>
			</View>
		);
	}
}

	BtnWActionSheet.propTypes = {
		text: PropTypes.string,
		iconName: PropTypes.string,
		items: PropTypes.array.isRequired,
		onSelect: PropTypes.func
	}

	BtnWActionSheet.defaultProps = {
		text: "",
		iconName: "x",
		items: [],
		onSelect: ()=>{}
	}
