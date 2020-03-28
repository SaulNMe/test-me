import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';

import BottomBarIcons from 'qualificame-native/app/components/BottomBarIcons';
import { Feather } from '@expo/vector-icons';
import TinyText from 'qualificame-native/app/components/TinyText';
import { Colors } from 'qualificame-native/app/styles';


function createTestProps (props) {
	return {
		// common props
		routeName: 'KiosksScreen',
		iconName: 'home',
		isActualScreen: true,
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<BottomBarIcons {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(TinyText).prop('text')).toEqual('Kioskos');
	});	

	it('displays the correct feather icon', () => {
		expect( wrapper.find(Feather).prop('name')).toEqual('home');
	});

	describe('with no props', ()=>{
		beforeEach(() => {
			wrapper = createWrapper({ routeName: 'KiosksScreen' });
		});

		it('displays no text', () => {
			expect(wrapper.find(TinyText)).toEqual({});
		});	

		it('displays the correct feather icon', () => {
			expect( wrapper.find(Feather).prop('name')).toEqual('home');
		});
	});
});
