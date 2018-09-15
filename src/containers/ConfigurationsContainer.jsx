import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Configurations from '../components/Configurations/Configurations';

class ConfigurationsContainer extends React.Component {
	render() {
		const { app } = this.props;

		return (
			<Configurations
				app={app}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		'app': state.app,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfigurationsContainer));
