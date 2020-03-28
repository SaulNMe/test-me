import React from 'react';
import { shallow } from 'enzyme';

import ListErrorState from 'qualificame-native/app/components/ListErrorState';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';

import { Text } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';


function createTestProps (props) {
	return {
		// common props
		color: 'blue',
		text: 'Ups... Parece que hubo un error',
		btnText: 'Volver a intentar',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<ListErrorState {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(SubtitleText).prop('text')).toEqual('Ups... Parece que hubo un error');
	});	

	it('displays the correct PrimaryBtn bgColor ', () => {
		expect(wrapper.find(PrimaryBtn).prop('bgColor')).toEqual('blue');
	});

	it('displays a PrimaryBtn', () => {
		expect(wrapper.find(PrimaryBtn).exists()).toBeTruthy();
	});	

	it('displays the correct PrimaryBtn text', () => {
		expect(wrapper.find(PrimaryBtn).exists()).toBeTruthy();
		expect(wrapper.find(PrimaryBtn).prop('text')).toEqual('Volver a intentar');
	});

});