import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'qualificame-native/app/components/ListItem';
import BodyText from 'qualificame-native/app/components/BodyText';

import { Text,View } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';

function createTestProps (props) {
	return {
		// common props
		text: "description",
		color: "blue",
		addVerticalMargin: true,
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<ListItem {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('description');
	});

	it('displays the correct dot color', () => {
		expect( wrapper.find(View).last().props().style.find(o => o.backgroundColor).backgroundColor).toEqual(Colors.blue) ;
	});

	it('displays verticalMargin', () => {
		expect(wrapper.first().props().style.find( o => o.marginVertical)).toBeTruthy();
	});

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});

		it('displays no text', () => {
			expect(wrapper.find(BodyText).prop('text')).toBeFalsy();
		});	

		it('displays no verticalMargin', () => {
			expect(wrapper.first().props().style.find( o => o.marginVertical)).toBeFalsy();
		});

		it('displays the correct dot color', () => {
			expect( wrapper.find(View).last().props().style.find(o => o.backgroundColor).backgroundColor).toEqual(Colors.pink) ;
		});

		it('displays correct weight font', () => {
			expect( wrapper.find(BodyText).prop('weight')).toEqual('light');
		});
	});
})
