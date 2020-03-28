import React from 'react';
import { shallow } from 'enzyme';

import BottomBanner from 'qualificame-native/app/components/BottomBanner';
import LabelText from 'qualificame-native/app/components/LabelText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';

import { Text } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';


function createTestProps (props) {
	return {
		// common props
		textBtn: 'text button text',
		text: 'text test',
		bgColor: 'green',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<BottomBanner {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(LabelText).prop('text')).toEqual('text test');
	});

	it('displays the correct background color', () => {
		expect( wrapper.first().props().style.find(o => o.backgroundColor).backgroundColor ).toEqual(Colors.green)
	});

	it('displays a PrimaryBtn', () => {
		expect(wrapper.find(PrimaryBtn).exists()).toBeTruthy();
	});

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		
		it('displays no text', () => {
			expect(wrapper.find(LabelText).prop('text')).toBeFalsy();
		});

		it('displays a white LabelText', () => {
			expect(wrapper.find(LabelText).prop('color')).toEqual('white');
		});

		it('displays a pink background color', () => {
			expect( wrapper.first().props().style.find(o => o.backgroundColor).backgroundColor ).toEqual(Colors.pink)
		});
	});
});