import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import { Colors  } from 'qualificame-native/app/styles';

import Divider from 'qualificame-native/app/components/Divider';

function createTestProps (props) {
	return {
		// common props
		onPress: ()=>{},
		color: "dark",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<Divider {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays view with height 1', () => {
		expect(wrapper.find(View).props().style.find(o => o.height).height).toEqual(1);
	});

	it.only('displays a dark line', () => {
		expect(wrapper.find(View).props().style.find(o => o.backgroundColor).backgroundColor).toEqual(Colors.dark);
	});	

	describe('when props are unset', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		it('displays a gray line', () => {
			expect(wrapper.find(View).props().style.find(o => o.backgroundColor).backgroundColor).toEqual(Colors.gray);
		});	
	});
});
