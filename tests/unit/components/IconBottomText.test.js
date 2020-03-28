import React from 'react';
import { shallow } from 'enzyme';

import IconBottomText from 'qualificame-native/app/components/IconBottomText';

import Feather from 'react-native-vector-icons/Feather';
import TitleText from 'qualificame-native/app/components/TitleText';
import { Colors } from 'qualificame-native/app/styles';
import { Text, View } from 'react-native';

function createTestProps (props) {
	return {
		// common props
		iconColor: 'blue',
		iconName: 'moon',
		color: 'red',
		title: 'test title',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<IconBottomText {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('displays test title as expected', () => {
		expect(wrapper.find(TitleText).prop('text')).toEqual('test title');
	});
	it('displays TitleText red color', () => {
		expect(wrapper.find(TitleText).prop('color')).toEqual('red');
	});
	it('displays the correct feather icon ', () => {
		expect(wrapper.find(Feather).exists()).toBeTruthy();
		expect(wrapper.find(Feather).props().name).toEqual('moon')
	});
	it('displays the correct feather icon color', () => {
		expect(wrapper.find(Feather).exists()).toBeTruthy();
		expect(wrapper.find(Feather).props().color).toEqual('blue')
	});	
});