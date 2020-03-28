import React from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity, View } from 'react-native';

import SecondaryBtn from 'qualificame-native/app/components/SecondaryBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Colors } from 'qualificame-native/app/styles';

function createTestProps (props) {
	return {
		// common props
		onPress: ()=>{},
		text: "Continuar",
		color: "blue",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<SecondaryBtn {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('displays the correct text', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('Continuar');
	});

	it('displays the correct border color', () => {
		expect( wrapper.find(View).props().style.find( o => o.borderColor).borderColor).toEqual(Colors.blue);
	});

	it('displays a transparent color', () => {
		expect( wrapper.find(View).props().style.find( o => o.backgroundColor).backgroundColor).toEqual(Colors.transparent);
	});

	describe('with no props', () => {
		beforeEach(()=>{
			wrapper = createWrapper();
		});

		it('displays the correct text', () => {
			expect(wrapper.find(BodyText).prop('text')).toEqual('Click me!');
		});

		it('displays the default border color', () => {
			expect( wrapper.find(View).props().style.find( o => o.borderColor).borderColor).toEqual(Colors.green);
		});
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<SecondaryBtn {...props}/>);
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
