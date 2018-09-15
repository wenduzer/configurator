import _ from 'lodash';
import request from 'superagent';

const config = {
	'API': 'http://localhost:1337',
};

export const { API } = config;

export const post = (url, data, cb) => {
	const apiURL = `${API}/${url}`;

	request
		.post(apiURL)
		// .withCredentials()
		.send(data)
		.end((err, res) => end(err, res, apiURL, cb));
};

export const get = (url, data, cb) => {
	const apiURL = `${API}/${url}`;

	request
		.get(apiURL)
		.query(data)
		// .withCredentials()
		.end((err, res) => end(err, res, apiURL, cb));
};

const end = (err, res, url, cb) => {
	/* eslint-disable no-console */
	console.log(`post request to ${url}`);
	console.info('res', res);
	cb(err, res);
};

export const handleServerResponse = (err, res) => {
	var serverError;
	const isSuccess = _.get(res, ['body', 'isSuccess']);
	const errorCode = _.get(res, ['body', 'errorCode']);
	const error = _.get(res, ['body', 'error']);

	if (err) {
		serverError = err;
	} else if (errorCode) {
		serverError = errorCode;
	} else if (error) {
		serverError = error;
	} else if (res.body === null) {
		serverError = '1001';
	} else if (!isSuccess) {
		serverError = '1001';
	}

	// serverError = 49;

	if (serverError) {
		console.error(serverError);
		return {
			'isError': true,
			'error': serverError,
		};
	}

	return {
		'isSuccess': true,
		'data': _.get(res, ['body', 'data']),
	};
};
