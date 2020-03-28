import React from 'react';
import { shallow } from 'enzyme';

import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import { Text, TouchableOpacity } from 'react-native';

function createTestProps (props) {
	return {
		// common props
		alertsAmount: 0,
		iconColor: 'white',
		onPress: ()=>{},
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<AlertBtn {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});
	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	describe('With default props', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		it('alertsAmount is set to 0', () => {
			let props = wrapper.instance().props;
			expect(props.alertsAmount).toBe(0);
		});
	});
	describe('when alertsAmount is between 0 and 99', () => {
		beforeEach(() => {
			const props = createTestProps({ alertsAmount: 33 })
			wrapper = createWrapper(props);
		});
		it('the badge is rendered', () => {
			expect(wrapper.find(Text).exists()).toBe(true);
			expect(wrapper.find(Text).children().text()).toEqual('33');
		});
	});
	describe('when alertsAmount is bigger than 99', () => {
		beforeEach(() => {
			const props = createTestProps({ alertsAmount: 100 })
			wrapper = createWrapper(props);
		});
		it('the badge is rendered and displays 99+', () => {
			expect(wrapper.find(Text).exists()).toBe(true);
			expect(wrapper.find(Text).children().text()).toEqual('99+');
		});
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<AlertBtn {...props}/>);
	describe('when onPress function is passed to props', () => {
		let fn;
		beforeEach(() => {
			fn = jest.fn();
			const props = createTestProps({ onPress: fn })
			wrapper = createWrapper(props);
		});
		it('it is called on button press', () => {
			wrapper.find(TouchableOpacity).first().props().onPress();
			expect(fn).toBeCalled();
		});
	});
})
