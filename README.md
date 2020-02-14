# easy-file-concat
[![npm version](https://badge.fury.io/js/easy-file-concat.svg)](https://badge.fury.io/js/easy-file-concat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Concatenate multiple files easily.

## Installation

Use NPM:
```shell script
$ npm i easy-file-concat
```

Use Yarn:
```shell script
$ yarn add easy-file-concat
```

## Usage
```shell script
$ easy-file-concat INPUT_FILE INPUT_FILE ... {OPTIONS}
```

or use the configuration file:
```shell script
$ easy-file-concat -c ./package.json -k config_key_1 config_key_2 ...
```

Options:
```
-o --output    The output destination file path of concatenated file.
-c --config    The path of config file (JSON format).
-k --key       The key for which the file list of the config file.
-b --boundary  The boundary string of files.
-v --version   Print the easy-ejs-renderer version number.
```