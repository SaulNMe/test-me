import React from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

import LoginBtn from 'qualificame-native/app/components/LoginBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
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
	const createWrapper = props => shallow(<LoginBtn {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});
	it('displays the correct text', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('Iniciar sesión');
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<LoginBtn {...props}/>);
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
