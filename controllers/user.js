'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();
const Services = require('../services');

const login = async (req, res) => {
	const criteria = {
		email: req.body.email,
		password: Buffer.from(req.body.password, 'base64')
	};
	let users = [];
	const projection = {
		__v: 0,
		password: 0
	};
	try {
		users = await Services.user.find(criteria, projection, {});
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	let token = null;
	if (users.length) {
		let userData = users[0];
		try {
			token = jwt.sign({
				id: userData._id,
				role: userData.role
			}, process.env.JWT_TOKEN);
		} catch (err) {
			console.log('===err===', err);
			return res.status(400).send({
				status: 'failure'
			})
		}

		return res.status(200).send({
			status: 'success',
			token: token,
			data: userData
		});
	}
};

const create = async (req, res) => {
	let userData = {};
	req.body.password = Buffer.from(req.body.password, 'base64');
	// req.body.password = new Buffer(req.body.password, 'utf8').toString();
	try {
		userData = await Services.user.create(req.body);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		id: userData._id
	});
};

const getAll = async (req, res) => {
	let users = [];
	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0,
		password: 0
	};
	try {
		users = await Services.user.find({}, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		data: users
	});
};

const remove = async (req, res) => {
	const criteria = {
		_id: req.params.id
	};
	try {
		await Services.user.deleteOne(criteria);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success'
	});
};

module.exports = {
	login,
	create,
	getAll,
	remove
};
