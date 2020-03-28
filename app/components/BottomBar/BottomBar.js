import React, { PureComponent } from 'react';
import { 
	SafeAreaView, 
	TouchableOpacity,
	View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './BottomBarStyle';
import BottomBarIcons from 'qualificame-native/app/components/BottomBarIcons';
import Divider from 'qualificame-native/app/components/Divider';
import NavigationService from 'qualificame-native/app/services/NavigationService';

export default class BottomBar extends PureComponent {
	state = {
		routeName: this.props.navigation.state.routes[this.props.navigation.state.index].routeName,
	}

	bounce = (routeName) => {
		this.setState({routeName})
	}
	render() {
		let routeName = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;
		return (
			<SafeAreaView>
				<Divider/>
				<View style={[styles.container, styles.row, styles.justifyContentSpaceAround]}>
			          	<BottomBarIcons
			          		onPress={(route) => this.bounce(route)}
							isActualScreen={ this.state.routeName === 'KiosksScreen'}
							routeName='KiosksScreen'
							name='Kioskos'
							color='green'
							iconName='home'
							bgColor='lightGreen'
						/>
			          	<BottomBarIcons 
			          		onPress={(route) => this.bounce(route)}
							isActualScreen={ this.state.routeName === 'ReportsScreen'}
							routeName='ReportsScreen'
							name='Reportes'
							color='blue'
							iconName='activity'
							bgColor='lightBlue'
						/>
			          	<BottomBarIcons 
			          		onPress={(route) => this.bounce(route)}
							isActualScreen={ this.state.routeName === 'MailBoxScreen'}
							routeName='MailBoxScreen'
							name='Buzón'
							color='orange'
							iconName='inbox'
							bgColor='lightOrange'
						/>
			          	<BottomBarIcons 
			          		onPress={(route) => this.bounce(route)}
							isActualScreen={ this.state.routeName === 'MyAccountScreen'}
							routeName='MyAccountScreen'
							name='Perfil'
							color='pink'
							iconName='user'
							bgColor='lightPink'
						/>
				</View>
			</SafeAreaView>
		);
	}
}

	BottomBar.propTypes = {
		// data: PropTypes.array
	}

	BottomBar.defaultProps = {
		// data: []
	}
