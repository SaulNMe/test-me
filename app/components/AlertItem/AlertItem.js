import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './AlertItemStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'qualificame-native/app/styles';

import BodyText from 'qualificame-native/app/components/BodyText';
import LabelText from 'qualificame-native/app/components/LabelText';
import TinyText from 'qualificame-native/app/components/TinyText';
import Divider from 'qualificame-native/app/components/Divider';


export default class AlertItem extends Component {
	render() {
		return (
			<TouchableOpacity
				disabled={this.props.disabled}
				style={(!this.props.seen ? styles.bgBlue : styles.bgWhite)}
				onPress={this.props.onPress}
				activeOpacity={0.6}
			>	
				{ this.props.addTopDivider && <Divider /> }	
				
				<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin, styles.row]}>
					
					<View style= {styles.flex2}>
						<BodyText 
							text={this.props.title}
							weight="medium"
						/>
						<View style={[styles.wrap, styles.row]}>	
							<LabelText 
								text= {this.props.description1}
								weight="light"
								color= {this.props.textColor}
							/>
							<LabelText 
								text= {this.props.description2}
								weight= 'medium'
								color= {this.props.valueColor}
							/>
							<LabelText 
								text= {this.props.description3}
								weight="light"
								color= {this.props.textColor}
							/>
						</View>	
					</View>
					<View>
						<TinyText	
							text={this.props.createdAtText}
							color={(!this.props.seen ? "green" : "gray")}
						/>
						<View style={[styles.smallTopMargin, {alignSelf: 'flex-end'}]}>	
							{(!this.props.seen ? <MaterialIcons name='fiber-manual-record' size={24} color={Colors[this.props.valueColor]}/> : null)}
						</View>
					</View>
				
				</View>
				{ this.props.addBottomDivider && <Divider /> }
			</TouchableOpacity>
		);
	}
}

AlertItem.propTypes = {
	onPress: PropTypes.func,
	createdAtText: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	addTopDivider: PropTypes.bool,
	addBottomDivider: PropTypes.bool,
	textColor: PropTypes.string,
	valueColor: PropTypes.string,
	seen: PropTypes.bool,
	description1: PropTypes.string,
	description2: PropTypes.string,
	description3: PropTypes.string
}

AlertItem.defaultProps = {
	onPress: ()=>{},
	createdAtText: '',
	title: '',
	description: '',
	addBottomDivider: false,
	addTopDivider: false,
	textColor: 'dark',
	valueColor: 'green',
	seen: false,
	description1: '',
	description2: '',
	description3: ''
}
