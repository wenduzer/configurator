var _ = require('lodash');
var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var utis = require('./utils');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	'extended': true,
}));

app.get('/getConfigurations', (req, res) => {
	res.send({
		'isSuccess': true,
		'data': utis.getAllFiles(),
	});
});

app.get('/getJSON/:configurationName', (req, res) => {
	const fileName = _.get(req, ['params', 'configurationName'], 'default');
	const configuration = utis.fileToJSON(fileName);

	res.json(configuration);
});

app.post('/saveJSON', (req, res) => {
	const fileName = _.get(req, ['body', 'configurationName'], 'default');
	const data = _.get(req, ['body', 'values']);
	// const isNew = _.get(req, ['body', 'isNew']);

	if (fileName === 'default') {
		res.send({
			'isSuccess': false,
			'errorCode': 'cantEditDefault',
		});
	} else {
		const finalData = _.omit(data, ['isNew']);
		utis.saveFile(fileName, finalData);

		res.send({
			'isSuccess': true,
			'data': utis.getAllFiles(),
		});
	}
});

server.listen(1337);
server.on('listening', () => {
	// eslint-disable-next-line no-console
	console.log('configurator server is running under http://localhost:1337');
});
