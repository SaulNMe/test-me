import React from 'react';
import { shallow } from 'enzyme';

import AlertItem from 'qualificame-native/app/components/AlertItem';
import BodyText from 'qualificame-native/app/components/BodyText';
import LabelText from 'qualificame-native/app/components/LabelText';
import TinyText from 'qualificame-native/app/components/TinyText';
import Divider from 'qualificame-native/app/components/Divider';
import { Text, TouchableOpacity } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';
function createTestProps (props) {
	return {
		// common props
		createdAtText: 'created',
		title: 'title test',
		description1: 'test description1',
		description2: 'test description2',
		description3: 'test description3',
		addTopDivider: true,
		addBottomDivider: true,
		seen: true,
		onPress: ()=>{},
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<AlertItem {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('displays createdAtText as expected', () => {
		expect(wrapper.find(TinyText).prop('text')).toEqual('created');
	});

	it('title match the provided text', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('title test');
	});

	it('displays the full description and correct text', () => {
		expect(wrapper.find(LabelText).getElements().length).toEqual(3);
		expect(wrapper.find(LabelText).get(0).props.text).toEqual('test description1');
		expect(wrapper.find(LabelText).get(1).props.text).toEqual('test description2');
		expect(wrapper.find(LabelText).get(2).props.text).toEqual('test description3');
	});

	it('displays the correct description color', ()=> {
		expect(wrapper.find(LabelText).get(1).props.color).toEqual('green');
	});

	it('displays the correct background color', () => {
		expect(wrapper.find(TouchableOpacity).props().style.backgroundColor).toEqual(Colors.white);
	});

	describe('when addtopDivider is true', () => {
		beforeEach(() => {
			wrapper = createWrapper({ addTopDivider: true });
		});
		it('displays only top divider', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(1);
			expect(wrapper.find(TouchableOpacity).children().first().name()).toEqual("Divider");
			expect(wrapper.find(TouchableOpacity).children().last().name()).not.toBe("Divider");
		});
	});

	describe('when addBottomDivider is true', () => {
		beforeEach(() => {
			wrapper = createWrapper({ addBottomDivider: true });
		});
		it('displays only bottom divider', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(1);
			expect(wrapper.find(TouchableOpacity).children().last().name()).toEqual("Divider");
			expect(wrapper.find(TouchableOpacity).children().first().name()).not.toBe("Divider");
		});
	});	

	describe('when addTopDivider and addBottomDivider are true', () => {
		beforeEach(() => {
			wrapper = createWrapper({ addBottomDivider: true, addTopDivider: true });
		});
		it('displays both dividers', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(2);
			expect(wrapper.find(TouchableOpacity).children().last().name()).toEqual("Divider");
			expect(wrapper.find(TouchableOpacity).children().first().name()).toEqual("Divider");
		});
	});

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		it('displays no text', () => {
			expect(wrapper.find(TinyText).prop('text')).toBeFalsy();
			expect(wrapper.find(LabelText).get(0).props.text).toBeFalsy();
			expect(wrapper.find(LabelText).get(1).props.text).toBeFalsy();
			expect(wrapper.find(LabelText).get(2).props.text).toBeFalsy();
			expect(wrapper.find(BodyText).prop('text')).toBeFalsy();
		});
		it('displays gray TinyText', () => {
			expect(wrapper.find(TinyText).prop('color')).toEqual('gray');
		});		
		it('displays bold BodyText', () => {
			expect(wrapper.find(BodyText).prop('weight')).toEqual('bold');
		});
		it('displays the correct description text weight', () => {
			expect(wrapper.find(LabelText).get(0).props.weight).toEqual('light');
			expect(wrapper.find(LabelText).get(1).props.weight).toEqual('medium');
			expect(wrapper.find(LabelText).get(2).props.weight).toEqual('light');
		});
		it('dividers are disabled', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(0);
		});
		it('displays default backgroundColor', () => {
			expect(wrapper.find(TouchableOpacity).props().style.backgroundColor).toEqual(Colors.lighterBlue);
		});
	});
})

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<AlertItem {...props}/>);
	describe('when onPress function is passed to props', () => {
		let fn;
		beforeEach(() => {
			fn = jest.fn();
			const props = createTestProps({ onPress: fn })
			wrapper = createWrapper(props);
		});
		it('it is called on button press', () => {
			wrapper.find(TouchableOpacity).first().props().onPress();
			expect(fn).toBeCalled();
		});
	});
})