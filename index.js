'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('./db');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 6003;


const { MONGO_URI, JWT_TOKEN } = process.env;

if (!MONGO_URI || !JWT_TOKEN) {
	console.error('\x1b[31m%s\x1b[0m', '----- Required envs are not available -----');
	process.exit(1);
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
	res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || 'Internal Server Error',
		},
	});
});

app.listen(port, () => {
	console.log('\x1b[32m%s\x1b[0m', `The server is listening on http://localhost:${port}`);
});
