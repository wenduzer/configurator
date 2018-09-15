import React, { Fragment } from 'react';
import {
	AppBar,
	IconButton,
	Typography,
	Toolbar,
	Drawer,
	withStyles,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
	Menu as MenuIcon,
	Add,
	Settings,
} from '@material-ui/icons';
import styles from './menuStyles';

class Menu extends React.Component {
	state = {
		'isDrawerOpen': false,
	}

	route = (path, closeDrawer) => {
		const { history } = this.props;

		if (closeDrawer) {
			this.toggleDrawer();
		}

		history.push(path);
	}

	toggleDrawer = () => {
		this.setState(state => ({
			'isDrawerOpen': !state.isDrawerOpen,
		}));
	}

	getDrawerList = () => {
		const { classes } = this.props;
		const list = [{
			'text': 'configurations',
			'icon': <Settings />,
			'path': '/',
		}, {
			'text': 'new configuration',
			'icon': <Add />,
			'path': '/new',
		}];

		return list.map((item, key) => (
			<ListItem key={key} button onClick={() => this.route(item.path, true)}>
				<ListItemIcon>
					{item.icon}
				</ListItemIcon>
				<ListItemText
					primary={item.text}
					classes={{
						'root': classes.menuDrawerListItemTextRoot,
					}}
				/>
			</ListItem>
		));
	}

	render() {
		const { classes } = this.props;
		const { isDrawerOpen } = this.state;

		return (
			<Fragment>
				<AppBar position="fixed" color="primary">
					<Toolbar>
						<IconButton
							color="inherit"
							onClick={this.toggleDrawer}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.menuTitle}>
							configurator
						</Typography>
						<Button
							color="secondary"
							variant="contained"
							size="small"
							onClick={() => this.route('/new')}
						>
							<Add />
							New Configuration
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					open={isDrawerOpen}
					onClose={this.toggleDrawer}
				>
					<List
						className={classes.menuDrawerList}
					>
						{this.getDrawerList()}
					</List>
				</Drawer>
			</Fragment>
		);
	}
}

export default withRouter(withStyles(styles)(Menu));
