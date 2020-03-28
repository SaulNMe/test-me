import React from 'react';
import { shallow } from 'enzyme';

import CheckItem from 'qualificame-native/app/components/CheckItem';
import BodyText from 'qualificame-native/app/components/BodyText';

import { Text } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';
import { Feather } from '@expo/vector-icons';

function createTestProps (props) {
	return {
		// common props
		iconColor: 'green',
		text: 'test text',
		verticalMargin: true,
		textColor: 'green',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<CheckItem {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('test text');
	});

	it('displays the correct text color', () => {
		expect(wrapper.find(BodyText).prop('color')).toEqual('green');
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
		it('displays feather icon', () => {
			expect(wrapper.find(Feather).exists()).toBeTruthy();
		});
		it('displays no verticalMargin', () => {
			expect(wrapper.first().props().style.find( o => o.marginVertical)).toBeFalsy();
		});
		it('displays the correct text color', () => {
			expect(wrapper.find(BodyText).prop('color')).toEqual('dark');
		});
	});
})
