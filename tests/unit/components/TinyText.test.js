import React from 'react';
import { shallow } from 'enzyme';

import TinyText from 'qualificame-native/app/components/TinyText';
import { Text } from 'react-native';
import { Fonts, Colors } from 'qualificame-native/app/styles';


function createTestProps (props) {
	return {
		// common props
		color: 'blue',
		text: 'test text',
		weight: 'bold',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<TinyText {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});
	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('Test text is rendered inside', () => {
		expect(wrapper.find(Text).children().text()).toEqual('test text');
	});
	it('Text have the correct fontSize', () => {
		expect(wrapper.find(Text).props().style.find(o => o.fontSize).fontSize).toEqual(Fonts.size.tiny);
	});
	it('Text have the correct color', () => {
		expect(wrapper.find(Text).props().style.find(o => o.color).color).toEqual(Colors.blue);
	});	
	it('Text have the correct fontWeight', () => {
		expect(wrapper.find(Text).props().style.find(o => o.fontWeight).fontWeight).toEqual(Fonts.weight.bold);
	});	
})

// describe('callbacks');
