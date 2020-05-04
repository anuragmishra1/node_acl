'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI || 'mongodb://localhost/test_roles';

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

// Create the database connection
mongoose.connect(dbURI, options, err => {
	if (err) {
		console.log('DB Error: ', err);
		throw err;
	} else {
		console.log('MongoDB Connected');
	}
});

mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
});
