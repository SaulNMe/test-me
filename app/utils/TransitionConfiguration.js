import { Animated, Easing } from 'react-native';

let SlideFromRight = (index, position, width) => {
	const inputRange = [index - 1, index, index + 1];
	const translateX = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [width, 0, 0]
	});
	const slideFromRight = { transform: [{translateX}]};
	return slideFromRight;
}

let CollapseExpand = (index, position) => {
	const inputRange = [index - 1, index, index + 1];
	const opacity = position.interpolate({
		inputRange, 
		outputRange: [0, 1, 1]
	});
	const scale = position.interpolate({
		inputRange,
		outputRange: ([0, 1, 1])
	});
	return {
		opacity,
	};
}

export default function TransitionConfiguration () {
	return {
		transitionSpec: {
			duration: 500,
			easing: Easing.out(Easing.poly(5)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: (screenProps) => {
			const { layout, position, scene } = screenProps;
			const width = layout.initWidth;
			const { index, route } = scene;
			const params = route.params || {};
			const transition = params.transition || 'default';
			return {
				collapseExpand: CollapseExpand(index, position),
				default: SlideFromRight(index, position, width),
			}[transition];
		},
	}
}