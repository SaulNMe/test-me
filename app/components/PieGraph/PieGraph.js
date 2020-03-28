import {
	VictoryLabel,
	VictoryPie
} from 'victory-native';
import {Svg} from "react-native-svg";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './PieGraphStyle';
import QualificameTheme from 'qualificame-native/app/styles/QualificameTheme';
import Colors from 'qualificame-native/app/styles/Colors';

export default class PieGraph extends PureComponent {
	render() {
		let w = this.props.width;
		let h = this.props.height;
		let colors = [Colors.green, Colors.blue, Colors.orange, Colors.pink, Colors.gray];

		return (
			<Svg 
				width={w}
				height={h}
			>
				<VictoryPie
					standalone={false}
					width={w}
					height={h}
					innerRadius={w/2 - this.props.stroke}
					cornerRadius={45}
					padAngle={1}
					data={this.props.data}
          			labelComponent={<VictoryLabel style={{fill: "transparent"}}/>}
          			colorScale={colors}
					padding= {{ top: 0, bottom: 0, left: 0, right: 0 }}
				/>

				<VictoryLabel
					textAnchor="middle" verticalAnchor="middle"
					x={w/2}
					y={h/2}
					style={ { fontSize: w/3, fill: String(this.props.labelColor) } }
					text={String(this.props.label)}
				/>
			</Svg>
		);
	}
}

	PieGraph.propTypes = {
		data: PropTypes.array.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		stroke: PropTypes.number,
		label: PropTypes.string,
		labelColor: PropTypes.string,
	}

	PieGraph.defaultProps = {
		stroke: 7,
		label: '',
		labelColor: 'green',
	}
