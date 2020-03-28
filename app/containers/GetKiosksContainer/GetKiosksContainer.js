import React, { Component } from 'react';
import { connect } from "react-redux";
import { getKiosks } from "qualificame-native/app/reducers";
class GetKiosksContainer extends Component {	

	render() {
		return (
			<React.Fragment>
				{
					this.props.children(this.props.kiosks)	
				}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({
	kiosks: getKiosks(state),
})

export default connect(mapStateToProps)(GetKiosksContainer);
