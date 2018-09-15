import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import initialState from './initialState';

export const history = createHistory();

const rootReducerWithRouter = connectRouter(history)(rootReducer);
const appRouterMiddleware = routerMiddleware(history);

const middleware = [
	thunk,
	appRouterMiddleware,
];

const store = createStore(rootReducerWithRouter, initialState, applyMiddleware(...middleware));

export default store;
