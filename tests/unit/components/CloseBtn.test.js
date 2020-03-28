import React from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import { Feather } from '@expo/vector-icons';

function createTestProps (props) {
	return {
		// common props
		onPress: ()=>{},
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<CloseBtn {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});
	it('displays feather icon', () => {
		expect(wrapper.find(Feather).exists()).toBeTruthy();
	});
	it('the feather icon display an x', () => {
		expect(wrapper.find(Feather).prop('name')).toEqual('x');
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<CloseBtn {...props}/>);
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
