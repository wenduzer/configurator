import { GET_CONFIGURATIONS } from '../constants';
import { get, handleServerResponse, post } from './api';

export const getConfigurations = () => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			get('getConfigurations', {}, (err, res) => {
				const serverResponse = handleServerResponse(err, res);

				if (serverResponse.isSuccess) {
					dispatch({
						'type': GET_CONFIGURATIONS,
						'payload': serverResponse.data,
					});
					resolve(serverResponse.data);
				} else {
					reject(err);
				}
			});
		});
	};
};

export const saveJSON = (configurationName, values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			post('saveJSON', { configurationName, values }, (err, res) => {
				const serverResponse = handleServerResponse(err, res);

				if (serverResponse.isSuccess) {
					dispatch({
						'type': GET_CONFIGURATIONS,
						'payload': serverResponse.data,
					});
					resolve(serverResponse.data);
				} else {
					reject(err);
				}
			});
		});
	};
};
