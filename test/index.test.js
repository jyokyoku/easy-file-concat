const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const easyFileConcat = require('../');

const inputDir = __dirname + '/files';
const outputDir = __dirname + '/output.txt';

afterEach(() => {
	rimraf.sync(inputDir);
	rimraf.sync(outputDir);
});

test('Array input files test', () => {
	mkdirp.sync(inputDir);
	mkdirp.sync(outputDir);

	const file1 = path.join(inputDir, 'sample1.txt');
	const file2 = path.join(inputDir, 'sample2.txt');

	fs.writeFileSync(file1, `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec`);

	fs.writeFileSync(file2, `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);

	const outputFile = path.join(outputDir, 'output.txt');

	easyFileConcat([file1, file2], outputFile);

	const fileData = fs.readFileSync(outputFile, 'utf8');

	expect(fileData).toBe(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies necpellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);
});

test('Boundary test', () => {
	mkdirp.sync(inputDir);
	mkdirp.sync(outputDir);

	const file1 = path.join(inputDir, 'sample1.txt');
	const file2 = path.join(inputDir, 'sample2.txt');

	fs.writeFileSync(file1, `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec`);

	fs.writeFileSync(file2, `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);

	const boundary1 = ', ';
	const outputFile1 = path.join(outputDir, 'output1.txt');

	easyFileConcat([file1, file2], outputFile1, boundary1);

	const fileData1 = fs.readFileSync(outputFile1, 'utf8');

	expect(fileData1).toBe(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec` + boundary1 + `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);
	fs.writeFileSync(file2, `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);

	const boundary2 = "\n";
	const outputFile2 = path.join(outputDir, 'output2.txt');

	easyFileConcat([file1, file2], outputFile2, boundary2);

	const fileData2 = fs.readFileSync(outputFile2, 'utf8');

	expect(fileData2).toBe(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec` + boundary2 + `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);
});

test('Comma separated input files test', () => {
	mkdirp.sync(inputDir);
	mkdirp.sync(outputDir);

	const file1 = path.join(inputDir, 'sample1.txt');
	const file2 = path.join(inputDir, 'sample2.txt');

	fs.writeFileSync(file1, `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec`);

	fs.writeFileSync(file2, `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);

	const boundary = ', ';
	const outputFile = path.join(outputDir, 'output.txt');

	easyFileConcat(file1 + ',' + file2, outputFile, boundary);

	const fileData = fs.readFileSync(outputFile, 'utf8');

	expect(fileData).toBe(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec` + boundary + `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);
});

test('Glob test', () => {
	mkdirp.sync(inputDir);
	mkdirp.sync(outputDir);

	const file1 = path.join(inputDir, 'sample1.txt');
	const file2 = path.join(inputDir, 'sample2.txt');

	fs.writeFileSync(file1, `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec`);

	fs.writeFileSync(file2, `pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);

	const outputFile = path.join(outputDir, 'output.txt');

	easyFileConcat(inputDir + '/*', outputFile);

	const fileData = fs.readFileSync(outputFile, 'utf8');

	expect(fileData).toBe(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies necpellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`);
});