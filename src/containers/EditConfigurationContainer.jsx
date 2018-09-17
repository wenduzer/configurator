import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { saveJSON } from '../actions/appActions';
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
		let finalValues = values;
		let configurationName = this.getCurrentConfigurationName();

		const { 'saveJSON': action, history } = this.props;
		const editedConfigurationName = _.get(values, ['configurationName']);

		if (isNew) {
			configurationName = _.get(values, ['configurationName']);
		}

		if (editedConfigurationName !== configurationName) {
			finalValues = _.set(values, ['editedConfigurationName'], editedConfigurationName);
		}

		finalValues = _.omit(values, ['configurationName']);

		this.setLoading(true);

		try {
			await action(configurationName, {
				isNew,
				...finalValues,
			});

			if (editedConfigurationName) {
				history.push(`/edit/${editedConfigurationName}`);
			}
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
		const { app, history } = this.props;
		const currentConfigurationName = this.getCurrentConfigurationName();
		const currentConfigurationData = _.get(app, [currentConfigurationName]);

		if (!currentConfigurationData || _.isEmpty(currentConfigurationData)) {
			history.push('/');
		}

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
	return bindActionCreators({ saveJSON }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditConfigurationContainer));
