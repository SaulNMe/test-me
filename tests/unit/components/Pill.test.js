import React from 'react';
import { shallow } from 'enzyme';
import { Image } from 'react-native';

import Pill from 'qualificame-native/app/components/Pill';
import BodyText from 'qualificame-native/app/components/BodyText';

function createTestProps (props) {
	return {
		// common props
		reaction: "excelent",
		amount: "250",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<Pill {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('displays the correct text', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('250');
	});

	it('displays an image', () => {
		expect( wrapper.find(Image).exists()).toBeTruthy();
	});

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});

		it('displays no text', () => {
			expect(wrapper.find(BodyText).prop('text')).toBeFalsy();
		});	

		it('displays default image', () => {
			expect(wrapper.find(Image).exists()).toBeTruthy();
		});
	});	
})
