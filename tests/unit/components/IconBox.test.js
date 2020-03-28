import React from 'react';
import { shallow } from 'enzyme';
import { LinearGradient } from 'expo-linear-gradient';

import IconBox from 'qualificame-native/app/components/IconBox';
import { Feather } from '@expo/vector-icons';

function createTestProps (props) {
	return {
		// common props
		bgColor: 'blue',
		iconName: 'moon',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<IconBox {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct feather icon ', () => {
		expect(wrapper.find(Feather).exists()).toBeTruthy();
		expect(wrapper.find(Feather).props().name).toEqual('moon')
	});

	it('displays the correct background color', () => {
		expect(wrapper.find(LinearGradient).props().colors).toEqual([ '#154BBA', '#107EC2' ]);
	});	

	describe('when props are not set', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
	
		it('displays the correct feather icon', () => {
			expect(wrapper.find(Feather).exists()).toBeTruthy();
			expect(wrapper.find(Feather).props().name).toEqual('x')
		});	

		it('displays the correct background color', () => {
			expect(wrapper.find(LinearGradient).props().colors).toEqual([ '#0F9F92', '#12B184' ]);
		});	

	});
})
