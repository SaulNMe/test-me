import React from 'react';
import { shallow } from 'enzyme';

import RatingItem from 'qualificame-native/app/components/RatingItem';
import BodyText from 'qualificame-native/app/components/BodyText';
import ReactionBox from 'qualificame-native/app/components/ReactionBox';

function createTestProps (props) {
	return {
		// common props
		onPress: ()=>{},
		reaction: "excelent",
		time: "16:00",
		branch: "Sucursal",
		comment: "Comentario",
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<RatingItem {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});

	it('displays the correct time', () => {
		expect( wrapper.find(BodyText).first().props().text ).toEqual('16:00');
	});	

	it('displays the correct branch', () => {
		expect( wrapper.find(BodyText).at(1).props().text ).toEqual('Sucursal');
	});

	it('displays the correct comment', () => {
		expect( wrapper.find(BodyText).last().props().text ).toEqual('Comentario');
	});

	describe('with no props', ()=>{
		beforeEach(() => {
			wrapper = createWrapper({ reaction:'excelent' });
		});

		it('displays no time', () => {
			expect( wrapper.find(BodyText).first().props().text ).toBeFalsy();
		});	

		it('displays no branch', () => {
			expect( wrapper.find(BodyText).at(1).props().text ).toBeFalsy();
		});

		it('displays no comment', () => {
			expect( wrapper.find(BodyText).last().props().text ).toBeFalsy();
		});

		it('displays an ReactionBox', () => {
			expect( wrapper.find(ReactionBox).exists()).toBeTruthy();
		});
	});

})

