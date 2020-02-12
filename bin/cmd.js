#!/usr/bin/env node

const fs = require('fs');

let mode = '';
let skip = false;

let inputFiles = [];
let outputFile;
let configKey;
let configFile;
let boundary;

const usage = () => `
usage: easy-file-concat INPUT_FILE,INPUT_FILE,... {OPTIONS}

  Concatenate multiple files easily.

OPTIONS are:

  -o --output    The output destination file path of concatenated file.
  -c --config    The path of config file (JSON format).
  -k --key       The key for which the file list of the config file.
  -b --boundary  The boundary string of files.
  -v --version   Print the easy-ejs-renderer version number.
`;

process.argv.slice(2).filter((arg) => {
	if (arg === '-v' || arg === '--version') {
		console.log(require('../package.json').version);
		process.exit(0);

	} else if (arg === '-h' || arg === '--help') {
		console.log(usage());
		process.exit(0);

	} else if (arg === '--output' || arg === '-o') {
		mode = 'output';
		skip = false;

	} else if (arg === '--config' || arg === '-c') {
		mode = 'configFile';
		skip = false;

	} else if (arg === '--key' || arg === '-k') {
		mode = 'configKey';
		skip = false;

	} else if (arg === '--boundary' || arg === '-b') {
		mode = 'boundary';
		skip = false;

	} else if (arg.match(/^-/)) {
		skip = true;

	} else if (skip) {
		return false;

	} else if (mode === 'output') {
		outputFile = arg;

	} else if (mode === 'configFile') {
		configFile = arg;

	} else if (mode === 'configKey') {
		configKey = arg;

	} else if (mode === 'boundary') {
		boundary = arg;

	} else {
		if (arg.indexOf(',') >= 0) {
			arg.split(',').forEach((file, i) => {
				inputFiles.push(file);
			});

		} else {
			inputFiles.push(arg);
		}
	}
});

if (inputFiles.length <= 0 && !configFile) {
	console.log(usage());
	process.exit(0);
}

if (configFile) {
	if (!configKey) {
		console.error("If you specify '--config-file' option, be sure to also specify '--key' option.");
		process.exit(1);
	}

	let config = {};

	try {
		config = JSON.parse(fs.readFileSync(configFile));

	} catch (e) {
		console.error(`The specified file '${configFile}' is not a valid JSON file.`);
		process.exit(1);
	}

	configKey.split('.').forEach((key, i) => {
		if (!config[key]) {
			console.error(`The specified key '${configKey}' is not found in the config file '${configFile}'.`);
			process.exit(1);
		}

		config = config[key];
	});

	inputFiles = config;
}

require('../')(inputFiles, outputFile, boundary);