import React from 'react';
import { shallow } from 'enzyme';
import { View, Image } from 'react-native';
import { Colors } from 'qualificame-native/app/styles';
import ReactionBox from 'qualificame-native/app/components/ReactionBox';

function createTestProps (props) {
	return {
		// common props
		reaction: "good",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<ReactionBox {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays the correct image ', () => {
		expect( wrapper.find(Image).exists()).toBeTruthy();
	});

	it('displays the correct background color', () => {
		expect(wrapper.find(View).props().style.find(o => o.backgroundColor).backgroundColor ).toEqual(Colors.lightBlue);
	});	

	describe('with no props', () => {
		beforeEach(()=>{
			wrapper = createWrapper();
		});

		it('displays the default image', () => {
			expect( wrapper.find(Image).exists()).toBeTruthy();
		});

		it('displays the default background color', () => {
			expect(wrapper.find(View).props().style.find(o => o.backgroundColor).backgroundColor ).toEqual(Colors.lightGreen);
		});	

	});
});
