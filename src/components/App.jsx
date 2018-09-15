import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import {
	withStyles,
} from '@material-ui/core';
import {
	Switch,
	Route,
} from 'react-router-dom';
import styles from '../styles/appStyles';
import ConfigurationsContainer from '../containers/ConfigurationsContainer';
import EditConfigurationContainer from '../containers/EditConfigurationContainer';
import Menu from './Menu/Menu';

class App extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<Menu />
				<div className={classes.appRoot}>
					<Switch>
						<Route exact path="/" component={ConfigurationsContainer} />
						<Route path="/edit/:configurationName" component={EditConfigurationContainer} />
						<Route path="/new" render={() => <EditConfigurationContainer isNew />} />
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(App);
