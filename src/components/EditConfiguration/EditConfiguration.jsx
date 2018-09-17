
import _ from 'lodash';
import React, { Fragment } from 'react';
import { withFormik, Field } from 'formik';
import {
	Paper,
	Typography,
	withStyles,
	Button,
} from '@material-ui/core';
import styles from './editConfigurationStyles';
import EditConfigurationSubCategory from './EditConfigurationSubCategory/EditConfigurationSubCategory';
import { TextField } from '../Fields';

class EditConfiguration extends React.Component {
	getConfigurationName = () => {
		const { isNew, configurationName } = this.props;

		if (isNew) {
			return 'New Configuration';
		}

		return `Edit Configuration ${configurationName}`;
	}

	renderSubCategories = () => {
		const { data } = this.props;
		const subCategoriesDOMArray = [];

		_.each(data, (subCategory, subCategoryName) => {
			subCategoriesDOMArray.push((
				<EditConfigurationSubCategory
					key={subCategoryName}
					subCategoryName={subCategoryName}
					fields={subCategory}
				/>
			));
		});

		return subCategoriesDOMArray;
	}

	renderConfigurationName = () => {
		const { isNew } = this.props;

		if (isNew) {
			return (
				<Field
					name="configurationName"
					component={TextField}
					label="Configuration Name"
				/>
			);
		} else {
			return (
				<Field
					name="configurationName"
					component={TextField}
					label="Edit Configuration Name"
				/>
			);
		}
	}

	render() {
		const { classes, handleSubmit } = this.props;

		return (
			<Fragment>
				<Paper className={classes.paper}>
					<Typography variant="headline" color="primary" gutterBottom>
						{this.getConfigurationName()}
					</Typography>
					{this.renderConfigurationName()}
				</Paper>
				{this.renderSubCategories()}
				<Button
					onClick={handleSubmit}
					variant="contained"
					fullWidth
					color="primary"
				>
					Save
				</Button>
			</Fragment>
		);
	}
}

const calculateConfigurationName = (configurationName) => {
	if (configurationName) {
		return configurationName === 'default' ? '' : configurationName;
	}

	return '';
};

const EditConfigurationWithForm = withFormik({
	'mapPropsToValues': props => ({
		'configurationName': calculateConfigurationName(props.configurationName),
		...props.data,
	}),
	'handleSubmit': (values, { props }) => {
		props.onSave(values, props.isNew);
	},
})(EditConfiguration);

export default withStyles(styles)(EditConfigurationWithForm);
