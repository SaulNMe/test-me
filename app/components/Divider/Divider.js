import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors  } from 'qualificame-native/app/styles';

import styles from './DividerStyle';

export default class Divider extends PureComponent {
  render() {
	return (
		<View style={[styles.divider, {backgroundColor: Colors[this.props.color]}]} />
	);
  }	
}

Divider.propTypes = {
	color: PropTypes.string
}

Divider.defaultProps = {
	color: 'gray'
}
