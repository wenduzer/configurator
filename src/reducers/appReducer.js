import _ from 'lodash';
import initialState from '../store/initialState';
import { GET_CONFIGURATIONS } from '../constants';

export default (state = initialState.app, action) => {
	const { payload, type } = action;

	if (type === GET_CONFIGURATIONS) {
		return _.assign(state, {}, {
			...payload,
		});
	}

	return state;
};
