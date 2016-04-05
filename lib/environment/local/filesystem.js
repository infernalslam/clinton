'use strict';
const fs = require('fs');
const path = require('path');
const pify = require('pify');
const fsP = pify(fs);

class LocalFileSystem {

	constructor(env) {
		this._env = env;
	}

	readFile(file) {
		return fsP.readFile(path.join(this._env._opts.cwd, file), 'utf8')
			.then(content => {
				if (path.extname(file) === '.json') {
					return JSON.parse(content);
				}

				return content;
			})
			.catch(err => {
				if (err.code === 'ENOENT') {
					return undefined;
				}

				throw err;
			});
	}
}

module.exports = LocalFileSystem;