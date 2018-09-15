import _ from 'lodash';
import React, { Fragment } from 'react';
import {
	Typography,
	Paper,
	withStyles,
} from '@material-ui/core';
import styles from './configurationsStyles';
import Configuration from './Configuration/Configuration';

class Settings extends React.Component {
	state = {
		'currentExpanded': null,
	}

	onExpand = (nextExpand) => {
		const { currentExpanded } = this.state;

		if (nextExpand === currentExpanded) {
			this.setState({
				'currentExpanded': null,
			});
		} else {
			this.setState({
				'currentExpanded': nextExpand,
			});
		}
	}

	renderConfigurations = () => {
		const { app } = this.props;
		const { currentExpanded } = this.state;
		const settingsDOMArray = [];

		_.each(app, (subCategories, configurationName) => {
			if (configurationName === 'default') {
				return;
			}

			settingsDOMArray.push(
				<Configuration
					currentExpanded={currentExpanded}
					onExpand={this.onExpand}
					configurationName={configurationName}
					subCategories={subCategories}
				/>
			);
		});

		return settingsDOMArray;
	}

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<Paper className={classes.settingsPaper}>
					<Typography variant="headline" color="primary">
						Configurations
					</Typography>
				</Paper>
				{this.renderConfigurations()}
			</Fragment>
		);
	}
}

export default withStyles(styles)(Settings);
