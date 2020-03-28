import React from 'react';
import { shallow } from 'enzyme';

import UserData from 'qualificame-native/app/components/UserData';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import Divider from 'qualificame-native/app/components/Divider';
import IconBox from 'qualificame-native/app/components/IconBox';
import { Text } from 'react-native';
import { Feather } from '@expo/vector-icons';


function createTestProps (props) {
	return {
		// common props
		name: 'name',
		email: 'email',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<UserData {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays name ', () => {
		expect( wrapper.find(SubtitleText).first().props().text ).toEqual('name');
	});

	it('displays email', () => {
		expect( wrapper.find(SubtitleText).last().props().text ).toEqual('email');
	});

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		
		it('displays no text', () => {
			expect(wrapper.find(SubtitleText).first().prop('text')).toBeFalsy();
			expect(wrapper.find(SubtitleText).last().prop('text')).toBeFalsy();
		});
		
		it('displays iconBox', () => {
			expect(wrapper.find(IconBox).exists()).toBeTruthy();
		});		

		it('displays both dividers', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(2);
		});
	});
});

