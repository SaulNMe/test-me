import React from 'react';
import { shallow } from 'enzyme';
import { Image } from 'react-native';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

function createTestProps (props) {
	return {
		// common props
		size: "medium",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<ResizableLogo {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('displays an image', () => {
		expect( wrapper.find(Image).exists()).toBeTruthy();
	});

	describe('with no props', () => {
		beforeEach(()=>{
			wrapper = createWrapper();
		});

		it('displays a default image', () => {
			expect( wrapper.find(Image).exists()).toBeTruthy();
		});
	});
});
