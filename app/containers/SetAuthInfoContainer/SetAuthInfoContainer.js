import React, { Component } from 'react';
import { connect } from "react-redux";
import { getIsLoading } from 'qualificame-native/app/reducers';
import { login } from "qualificame-native/app/actions/AuthActions";
class SetAuthInfoContainer extends Component {	

	render() {
		return (
			<React.Fragment>
			{
				this.props.children(this.props.login, this.props.isLoading)
			}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({
	isLoading: getIsLoading(state)
})

export default connect(mapStateToProps, { login })(SetAuthInfoContainer);
