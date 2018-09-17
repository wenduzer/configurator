var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');

const fileToJSON = (configurationName) => {
	const filePath = `server/configurations/${configurationName}.json`;
	var contents = fs.readFileSync(filePath);

	return JSON.parse(contents);
};

const saveFile = (configurationName, data, newConfigurationName) => {
	const currentFilePath = `server/configurations/${configurationName}.json`;
	const parsedData = JSON.stringify(data);
	let finalFilePath = currentFilePath;

	if (newConfigurationName) {
		const newFilePath = `server/configurations/${newConfigurationName}.json`;
		fs.renameSync(currentFilePath, newFilePath);
		finalFilePath = newFilePath;
	}

	fs.writeFileSync(finalFilePath, parsedData);
};

const getAllFiles = () => {
	var final = {};

	const files = glob.sync('server/configurations/*.json');

	_.each(files, (file) => {
		const dirtyData = fs.readFileSync(file, 'utf8');
		const data = JSON.parse(dirtyData);
		const configurationNameWithJson = file.split('/')[2];
		const configurationName = configurationNameWithJson.split('.json')[0];

		final = {
			...final,
			[configurationName]: data,
		};
	});

	return final;
};

module.exports = {
	fileToJSON,
	saveFile,
	getAllFiles,
};
