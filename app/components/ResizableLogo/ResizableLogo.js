import React, { PureComponent } from 'react';
import { Image  } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ResizableLogoStyle';

export default class ResizableLogo extends PureComponent {
	render() {
		let imageSource;
		switch(this.props.size) {
			case "small":
				imageSource =  require('qualificame-native/assets/small_logo.png');
			break;
			case "medium":
				imageSource = require('qualificame-native/assets/medium_logo.png');
			break;
			case "large":
				imageSource =  require('qualificame-native/assets/large_logo.png');
			break;
		}
	
		return (
			<React.Fragment>
				<Image
					source={imageSource}
				/>
			</React.Fragment>
		);
	}
}

	ResizableLogo.propTypes = {
		size: PropTypes.string
	}

	ResizableLogo.defaultProps = {
		size: "small"
	}
