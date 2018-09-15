import React from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

const componentLoaderStyles = theme => ({
	'componentLoaderRoot': {
		'display': 'flex',
		'zIndex': 999999,
		'alignItems': 'center',
		'width': '100vw',
		'height': '100vh',
		'position': 'fixed',
		'left': 0,
		'top': 0,
		'background': theme.palette.background.default,
		'justifyContent': 'center',
	},
});


const ComponentLoader = ({ classes }) => (
	<div className={classes.componentLoaderRoot}>
		<CircularProgress />
	</div>
);

export default withStyles(componentLoaderStyles)(ComponentLoader);
