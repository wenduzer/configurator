import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getConfigurations } from '../actions/appActions';
import App from '../components/App';
import withLoader from '../components/withLoader/withLoader';

const AppWithLoader = withLoader(App);


class AppContainer extends React.Component {
	state = {
		'isLoading': true,
		'error': null,
		'shouldDisplayError': false,
	}

	async componentWillMount() {
		const { 'getConfigurations': action } = this.props;

		try {
			await action();
		} catch (error) {
			this.setError(true, error);
		}

		setTimeout(() => {
			this.setLoading(false);
		}, 1000);
	}

	setLoading = (isLoading) => {
		this.setState({
			isLoading,
		});
	}

	setError = (shouldDisplayError, error) => {
		this.setState({
			shouldDisplayError,
			error,
		});
	}

	render() {
		const { app } = this.props;
		const { isLoading, shouldDisplayError, error } = this.state;

		if (!isLoading && shouldDisplayError) {
			return (
				<div>Error: {error}</div>
			);
		}

		return (
			<AppWithLoader
				app={app}
				isLoading={isLoading}
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
	return bindActionCreators({ getConfigurations }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
