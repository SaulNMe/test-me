import React from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity, View } from 'react-native';

import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
import { LinearGradient } from 'expo-linear-gradient';


function createTestProps (props) {
	return {
		// common props
		onPress: ()=>{},
		text: "Continuar",
		bgColor: "blue",
		hasHorizontalMargin: true,		
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<PrimaryBtn {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('displays the correct text', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('Continuar');
	});

	it('displays horizontal margin', () => {
		expect( wrapper.find(View).props().style.find( o => o.marginHorizontal)).toBeTruthy() ;
	});

	it('displays the correct background color', () => {
		expect( wrapper.find(LinearGradient).props().colors ).toEqual( [ '#154BBA', '#107EC2' ]);
	});

	describe('with no props', () => {
		beforeEach(()=>{
			wrapper = createWrapper();
		});

		it('displays the correct text', () => {
			expect(wrapper.find(BodyText).prop('text')).toEqual('Click me!');
		});

		it('displays no horizontal margin', () => {
			expect( wrapper.find(View).props().style.find( o => o.marginHorizontal)).toBeFalsy() ;
		});

		it('displays the default background color', () => {
			expect( wrapper.find(LinearGradient).props().colors ).toEqual(['#fff', '#fff']) ;
		});
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<PrimaryBtn {...props}/>);
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
