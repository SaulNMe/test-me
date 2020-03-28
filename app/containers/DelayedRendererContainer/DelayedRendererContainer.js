import React, { Component } from 'react';


export default class DelayedRendererContainer extends Component {	

	state = { showChildren: false }

	componentDidMount() {
		setTimeout(() => {
			this.setState({ showChildren: true })
		}, 500)
	}

	render() {
		return (
			<React.Fragment>
				{
					this.state.showChildren ?  this.props.children : this.props.loader
				}
			</React.Fragment>
		);
	}

}
