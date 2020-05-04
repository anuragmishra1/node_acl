'use strict';

const Services = require('../services');

const create = async (req, res) => {
	let permissionData = {};
	req.body['attributes'] = ['*'];
	try {
		permissionData = await Services.acl.create(req.body);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		id: permissionData._id
	});
};

const getAll = async (req, res) => {
	let permissions = [];
	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0
	};
	try {
		permissions = await Services.acl.find({}, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		data: permissions
	});
};

const remove = async (req, res) => {
	const criteria = {
		_id: req.params.id
	};
	try {
		await Services.acl.deleteOne(criteria);
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
	create,
	getAll,
	remove
};
