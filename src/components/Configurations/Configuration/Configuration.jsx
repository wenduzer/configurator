import _ from 'lodash';
import React from 'react';
import {
	withStyles,
	Typography,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Divider,
	ExpansionPanelActions,
	Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
	ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import styles from './configurationStyles';
import SubConfiguration from '../SubConfiguration/SubConfiguration';

class Configuration extends React.Component {
	handleEditCategory = () => {
		const { history, configurationName } = this.props;
		history.push(`/edit/${configurationName}`);
	}

	renderSubCategories = () => {
		const { subCategories, configurationName } = this.props;
		const subCategoriesDOMArray = [];

		_.each(subCategories, (data, key) => {
			subCategoriesDOMArray.push(
				<SubConfiguration
					key={key}
					categoryName={configurationName}
					subCategoryName={key}
					data={data}
				/>
			);
		});

		return subCategoriesDOMArray;
	}

	render() {
		const {
			classes,
			configurationName,
			currentExpanded,
			onExpand,
		} = this.props;

		return (
			<ExpansionPanel
				expanded={currentExpanded === configurationName}
				onChange={() => onExpand(configurationName)}
			>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>{configurationName}</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails
					className={classes.sinlgeConfigurationContainer}
				>
					{this.renderSubCategories()}
				</ExpansionPanelDetails>
				<Divider />
				<ExpansionPanelActions>
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleEditCategory}
					>
						Edit
					</Button>
				</ExpansionPanelActions>
			</ExpansionPanel>
		);
	}
}

const styledComponent = withStyles(styles)(Configuration);
export default withRouter(styledComponent);
