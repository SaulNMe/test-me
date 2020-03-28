import React, { PureComponent } from 'react';
import { Text, View, Animated, Platform, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'qualificame-native/app/styles';

import styles from './BottomBarIconsStyle';
import { Feather } from '@expo/vector-icons';
import TinyText from 'qualificame-native/app/components/TinyText';

import NavigationService from 'qualificame-native/app/services/NavigationService'; 
export default class BottomBarIcons extends PureComponent {
	_width = new Animated.Value(41);
	_widthText = new Animated.Value(50);
	_heightText = new Animated.Value(Platform.OS === 'ios' ? 15 : 16.3);
	state = {
		isActualScreen: this.props.isActualScreen,
		routeName: this.props.routeName,
	}

	componentDidMount() {
		if(this.props.isActualScreen){
			setTimeout(() => {
				this.handleWidth();
			},400)
		}		
	}
	
	componentDidUpdate(prevProps, prevState) {
		setTimeout(() => {
			if(this.props.isActualScreen){
				this.handleWidth();
			} else {
				this.resetWidth();
			}
		},400)
	}

	switchValue = () => {
		switch(this.state.routeName){
			case 'KiosksScreen':
				this._widthText = Platform.OS === 'ios' ? 46 : 44 
				return this._widthText + 50;
			case 'ReportsScreen':
				this._widthText = Platform.OS === 'ios' ? 54 : 50
				return this._widthText + 50;
			case 'MailBoxScreen':
				this._widthText = Platform.OS === 'ios' ? 37 : 34
				return this._widthText + 50;
			case 'MyAccountScreen':
				this._widthText = Platform.OS === 'ios' ? 31.5 : 31
				return this._widthText + 50;
		}
	}
	
	handleWidth = () => {
		Animated.timing(
			this._width, {
				toValue: this.switchValue(),
				duration: 200
			}
		).start();
	}

	resetWidth = () => {
		Animated.timing(
			this._width, {
				toValue: 41,
				duration: 200
			}
		).start();		
	}
	
	handleOnPress = () => {
		if(!this.props.isActualScreen){
 			this.props.onPress(this.props.routeName);
 			NavigationService.navigate(this.props.routeName);
		}
	}

	render() {
		let color = this.props.isActualScreen ? Colors[this.props.color] : '#364350';
		let stylesActualScreen = this.props.isActualScreen ? [
					styles.pillStyle,
					styles.row,
					styles.alignItemsCenter,
					styles.smallVerticalPadding,
					styles.smallHorizontalPadding,
					{ overflow: 'hidden', backgroundColor: Colors[this.props.bgColor]}] : [];

		return (
			<TouchableOpacity 
					onPress={() => this.handleOnPress()}
					style={styles.centerObjects}
			>
				<Animated.View style={[stylesActualScreen, (this.props.isActualScreen && {width: this._width})]}>
					<Feather 
						name={this.props.iconName} 
						size={25}
						color={color}
					/>
					{ this.props.isActualScreen && 
						<Animated.View style={[styles.smallLeftMargin, {width: this._widthText, height: this._heightText, overflow: 'hidden'}]}>
							<TinyText 
								text={this.props.name}
								color={this.props.color}
								weight="medium"
							/>
						</Animated.View>
					}
				</Animated.View>
		     </TouchableOpacity>

		);
	}
}

BottomBarIcons.propTypes = {
	routeName: PropTypes.string,
	isActualScreen: PropTypes.bool,
	name: PropTypes.string,
	color: PropTypes.string,
	iconName: PropTypes.string,
	bgColor: PropTypes.string,
}

BottomBarIcons.defaultProps = {
	routeName: '',
	isActualScreen: false,
	name: 'Kioskos' ,
	color: 'green' ,
	iconName: 'home' ,
	bgColor: 'lightGreen' ,
}
