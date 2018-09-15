import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getJSON, saveJSON } from '../actions/appActions';
import EditConfiguration from '../components/EditConfiguration/EditConfiguration';
import withLoader from '../components/withLoader/withLoader';

const EditWithLoader = withLoader(EditConfiguration);

class EditConfigurationContainer extends React.Component {
	state = {
		'isLoading': false,
		'error': null,
		'shouldDisplayError': false,
	}

	onSaveJSON = async (values, isNew) => {
		const { 'saveJSON': action } = this.props;
		let configurationName = this.getCurrentConfigurationName();
		let finalValues = values;

		if (isNew) {
			configurationName = _.get(values, ['configurationName']);
		}

		finalValues = _.omit(values, ['configurationName']);

		this.setLoading(true);

		try {
			await action(configurationName, {
				isNew,
				...finalValues,
			});
		} catch (error) {
			this.setError(true, error);
		}

		this.setLoading(false);
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

	getCurrentConfigurationName = () => {
		const { isNew, match } = this.props;
		if (isNew) {
			return 'default';
		}

		const currentConfigurationName = _.get(match, ['params', 'configurationName']);

		if (!currentConfigurationName) {
			console.error('no configuration name');
		}

		return currentConfigurationName;
	}

	getCurrentConfigurations = () => {
		const { app } = this.props;
		const currentConfigurationName = this.getCurrentConfigurationName();

		return _.get(app, [currentConfigurationName]);
	}

	render() {
		const { isNew } = this.props;
		const { isLoading, shouldDisplayError, error } = this.state;

		if (!isLoading && shouldDisplayError) {
			return (
				<div>Error: {error}</div>
			);
		}

		return (
			<EditWithLoader
				isLoading={isLoading}
				isNew={isNew}
				onSave={this.onSaveJSON}
				configurationName={this.getCurrentConfigurationName()}
				data={this.getCurrentConfigurations()}
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
	return bindActionCreators({ getJSON, saveJSON }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditConfigurationContainer));
