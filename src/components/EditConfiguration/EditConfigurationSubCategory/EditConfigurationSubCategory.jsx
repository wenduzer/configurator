import _ from 'lodash';
import React from 'react';
import { Field } from 'formik';
import {
	Paper,
	Grid,
	withStyles,
	Typography,
} from '@material-ui/core';
import { TextField } from '../../Fields';
import styles from './editConfigurationSubCategoryStyles';

class EditConfigurationSubCategory extends React.Component {
	renderFields = () => {
		const { fields, subCategoryName } = this.props;
		const fieldsDOMArray = [];

		_.each(fields, (fieldValue, fieldName) => {
			fieldsDOMArray.push((
				<Grid item xs={12}>
					<Field
						key={fieldName}
						id={fieldName}
						name={`${subCategoryName}.${fieldName}`}
						component={TextField}
						label={fieldName}
					/>
				</Grid>
			));
		});

		return fieldsDOMArray;
	}

	render() {
		const { subCategoryName, classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Typography variant="subheading" color="secondary">
							{subCategoryName}
						</Typography>
					</Grid>
					{this.renderFields()}
				</Grid>
			</Paper>
		);
	}
}

export default withStyles(styles)(EditConfigurationSubCategory);
