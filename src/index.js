import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import theme from './styles/theme';
import store, { history } from './store';
import registerServiceWorker from './workers/registerServiceWorker';
import AppContainer from './containers/AppContainer';

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider theme={theme}>
						<AppContainer />
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
