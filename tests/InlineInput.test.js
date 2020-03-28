import React from 'react';
import { shallow } from 'enzyme';

import { Text, TextInput } from 'react-native';
import InlineInput from 'qualificame-native/app/components/InlineInput';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Colors, Fonts } from 'qualificame-native/app/styles';

function createTestProps (props) {
	return {
		createdAtText: 'created',
		text: 'text test',
		color: 'red',
		//percent: true,
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<InlineInput {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('displays test title as expected', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('text test');
	});
	it('displays BodyText dark color', () => {
		expect(wrapper.find(BodyText).prop('color')).toEqual('dark');
	});	
	it('displays BodyText regular weight', () => {
		expect(wrapper.find(BodyText).prop('weight')).toEqual('regular');
	});	
	it('displays the TextInput ', () => {
		expect(wrapper.find(TextInput).exists()).toBeTruthy();
		expect(wrapper.find(TextInput).prop('keyboardType')).toEqual('numeric')
		expect(wrapper.find(TextInput).prop('maxLenght')).toEqual(3)
	});
	it('when HugeText to be falsy', () => {
		expect(wrapper.find(HugeText).exists()).toBeFalsy();
	});
	describe('when HugeText is true', () => {
		beforeEach(() => {
			wrapper = createWrapper({ percent: true });
		});
		it('displays the HugeText', () => {
			expect(wrapper.find(HugeText).exists()).toBeTruthy();
			expect(wrapper.find(HugeText).prop('text')).toEqual('%');
			expect(wrapper.find(HugeText).prop('weight')).toEqual('bold');
			expect(wrapper.find(HugeText).prop('color')).toEqual('green');
		});
	});
});