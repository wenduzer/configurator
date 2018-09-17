var _ = require('lodash');
var http = require('http');
var express = require('express');
var path = require('path');
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
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/getConfigurations', (req, res) => {
	res.send({
		'isSuccess': true,
		'data': utis.getAllFiles(),
	});
});

app.get('/api/getJSON/:configurationName', (req, res) => {
	const fileName = _.get(req, ['params', 'configurationName'], 'default');
	const configuration = utis.fileToJSON(fileName);

	res.json(configuration);
});

app.post('/api/saveJSON', (req, res) => {
	const fileName = _.get(req, ['body', 'configurationName'], 'default');
	const data = _.get(req, ['body', 'values']);
	const editedConfigurationName = _.get(data, ['editedConfigurationName']);

	if (fileName === 'default' || editedConfigurationName === 'default') {
		res.send({
			'isSuccess': false,
			'errorCode': 'cantEditDefault',
		});
	} else {
		const finalData = _.omit(data, ['isNew', 'editedConfigurationName']);
		utis.saveFile(fileName, finalData, editedConfigurationName);

		res.send({
			'isSuccess': true,
			'data': utis.getAllFiles(),
		});
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(3001);
server.on('listening', () => {
	// eslint-disable-next-line no-console
	console.log('configurator server is running under http://localhost:3001');
});
