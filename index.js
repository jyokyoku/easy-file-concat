const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');

module.exports = (inputFiles, outputFile, boundary = '') => {
	if (typeof inputFiles === 'string') {
		inputFiles = inputFiles.split(',');

	} else if (!Array.isArray(inputFiles)) {
		throw new TypeError(`Invalid type '$(typeof inputFiles)' of the 'inputFiles' variable.`);
	}

	let results = [];

	inputFiles.forEach((inputFile, i) => {
		inputFile = inputFile.trim();

		let files = [];

		if (inputFile.indexOf('*') >= 0) {
			files = glob.sync(inputFile);

		} else {
			files.push(inputFile);
		}

		files.forEach((file, i) => {
			file = path.resolve(file);

			try {
				results.push(fs.readFileSync(file));

			} catch (e) {
				console.log(e);
			}
		})
	});

	if (outputFile) {
		outputFile = path.resolve(outputFile);
		outputDir = path.dirname(outputFile);
		mkdirp.sync(outputDir);

		fs.writeFileSync(outputFile, results.join(boundary));

	} else {
		console.log(results.join(boundary));
	}
};