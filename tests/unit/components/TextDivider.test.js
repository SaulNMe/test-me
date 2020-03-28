import React from 'react';
import { shallow } from 'enzyme';

import TextDivider from 'qualificame-native/app/components/TextDivider';
import Divider from 'qualificame-native/app/components/Divider';
import TinyText from 'qualificame-native/app/components/TinyText';
import { Colors } from 'qualificame-native/app/styles';
import { View } from 'react-native';

function createTestProps (props) {
	return {
		// common props
		text: 'text',
		color: 'blue',
		addHorizontalMargin: true,
		addVerticalMargin: true,
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<TextDivider {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text', () => {
		expect(wrapper.find(TinyText).props().text).toEqual('text');
	});	

	it('displays the correct color text', () => {
		expect(wrapper.find(TinyText).props().color).toEqual('blue');
	});	

	it('displays a vertical margin', () => {
		expect(wrapper.find(View).first().props().style.find(o => o.marginVertical).marginVertical).toBeTruthy();
	});

	it('displays a horizontal margin', () => {
		expect(wrapper.find(View).first().props().style.find(o => o.marginHorizontal).marginHorizontal).toBeTruthy();
	});

	it('displays both Dividers', () => {
		expect(wrapper.find(Divider).getElements().length).toEqual(2);
	});

	describe('with no props', ()=>{
		beforeEach(() => {
			wrapper = createWrapper();
		});
		it('displays no text', () => {
			expect(wrapper.find(TinyText).props().text).toEqual('');
		});	

		it('displays both Dividers', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(2);
		});

		it('displays no vertical margin', () => {
			expect(wrapper.find(View).first().props().style.find(o => o.marginVertical)).toBeFalsy();
		});

		it('displays no horizontal margin', () => {
			expect(wrapper.find(View).first().props().style.find(o => o.marginHorizontal)).toBeFalsy();
		});

	})
})

// describe('callbacks');
