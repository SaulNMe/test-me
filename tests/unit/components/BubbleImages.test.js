import React from 'react';
import { shallow } from 'enzyme';

import BubbleImages from 'qualificame-native/app/components/BubbleImages';

import BodyText from 'qualificame-native/app/components/BodyText';
import { Text, Image } from 'react-native';

function createTestProps (props) {
	return {
		// common props
		firstText: 'Text No 1',
		secondText: 'Text No 2',
		thirdText: 'Text No 3',
		textColor: 'red',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<BubbleImages {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders ad expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays text', () => {
		expect(wrapper.find(BodyText).get(0).props.text).toBeTruthy();
		expect(wrapper.find(BodyText).get(1).props.text).toBeTruthy();
		expect(wrapper.find(BodyText).get(2).props.text).toBeTruthy();
	});

	it('displays images', () => {
		expect(wrapper.find(Image).get(0)).toBeTruthy();
		expect(wrapper.find(Image).get(1)).toBeTruthy();
		expect(wrapper.find(Image).get(2)).toBeTruthy();
	});
})