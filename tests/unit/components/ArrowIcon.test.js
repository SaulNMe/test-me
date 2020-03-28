import React from 'react';
import { shallow } from 'enzyme';

import ArrowIcon from 'qualificame-native/app/components/ArrowIcon';
import BodyText from 'qualificame-native/app/components/BodyText';
import Divider from 'qualificame-native/app/components/Divider';
import IconBox from 'qualificame-native/app/components/IconBox';
import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


function createTestProps (props) {
	return {
		// common props
		createdAtText: 'created',
		text: 'text test',
		addTopDivider: false,
		addBottomDivider: false,
		onPress: ()=>{},
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<ArrowIcon {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct text ', () => {
		expect(wrapper.find(BodyText).prop('text')).toEqual('text test');
	});

	it('displays dark BodyText', () => {
		expect(wrapper.find(BodyText).prop('color')).toEqual('dark');
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
			expect(wrapper.find(BodyText).prop('text')).toBeFalsy();
		});
		
		it('dividers are disabled', () => {
			expect(wrapper.find(Divider).getElements().length).toEqual(0);
		});

		it('displays iconBox', () => {
			expect(wrapper.find(IconBox).exists()).toBeTruthy();
		});		

		it('displays feather icon', () => {
			expect(wrapper.find(Feather).exists()).toBeTruthy();
		});
	});
});

describe('interactions', () => {
	let wrapper;
	const createWrapper = props => shallow(<ArrowIcon {...props}/>);
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
