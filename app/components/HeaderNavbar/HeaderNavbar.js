import React, { Component } from 'react';
import { 
	Text, 
	View,
	SafeAreaView,
	StatusBar 
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './HeaderNavbarStyle';

export default class HeaderNavbar extends Component {
	render() {
		let gradientColors;
		switch(this.props.bgColor){
			case 'green':
				gradientColors = ['#0F9F92', '#12B184'];
			break;
			case 'blue':
				gradientColors = ['#154BBA', '#107EC2'];
			break;
			case 'orange':
				gradientColors = ['#E62808', '#FC680A'];
			break;
			case 'pink':
				gradientColors = ['#E31862', '#EB194D'];
			break;
			default: 
				gradientColors = ['#fff', '#fff'];
		}

		let content = (
			<View style={[styles.navBarHeight, styles.row, styles.alignItemsCenter, styles.above, styles.statusBarSpace, styles.baseHorizontalMargin]}>
				<View style={[styles.flex1, styles.behind]}>
					{this.props.left && 
						this.props.left
					}
				</View>
				{this.props.center && 
					<View style={[styles.flex2, styles.alignItemsCenter]}>
						{this.props.center}
					</View>
				}
				<View style={[styles.flex1, styles.alignItemsFlexEnd ]}>
					{this.props.right && 
						this.props.right
					}
				</View>
			</View>
		)

		return (
			<View>
				<StatusBar barStyle={this.props.statusBar} />
				{ !!this.props.bgColor ?
					<LinearGradient colors={gradientColors}  start={[0, 0]} end={[1, 0]}>
						<SafeAreaView>
							{content}
						</SafeAreaView>
					</LinearGradient>
				:
					<React.Fragment>
						<SafeAreaView>
							{content}
						</SafeAreaView>
					</React.Fragment>				
				}
			</View>
		);
	}
}

	HeaderNavbar.propTypes = {
		statusBar: PropTypes.string,
		left: PropTypes.object,
		center: PropTypes.object,
		right: PropTypes.object,
		bgColor: PropTypes.string
	}

	HeaderNavbar.defaultProps = {
		statusBar: 'default',
		left: null,
		center: null,
		right: null,
		bgColor: ""
	}
