import _ from 'lodash';
import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import styles from './subConfigurationStyles';

class SubConfiguration extends React.Component {
	renderFields = () => {
		const { data, classes } = this.props;
		const dataDOMArray = [];

		_.each(data, (fieldValue, fieldName) => {
			const isBool = _.isBoolean(fieldValue);
			const value = isBool ? fieldValue.toString() : fieldValue;

			dataDOMArray.push(
				<Grid key={fieldName} item xs={12}>
					<Typography
						variant="subheading"
						className={classes.tabbed}
					>
						{fieldName}: <span className={classes.code}>{value}</span>
					</Typography>
				</Grid>
			);
		});

		return dataDOMArray;
	}

	render() {
		const { subCategoryName, classes } = this.props;

		return (
			<Grid className={classes.grid} container spacing={8}>
				<Grid item xs={12}>
					<Typography
						variant="subheading"
						color="primary"
					>
						{subCategoryName}
					</Typography>
				</Grid>
				{this.renderFields()}
			</Grid>
		);
	}
}

export default withStyles(styles)(SubConfiguration);
