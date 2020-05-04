'use strict';

const Services = require('../services');

const create = async (req, res) => {
	let companyData = {};
	try {
		companyData = await Services.company.create(req.body);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		id: companyData._id
	});
};

const getAll = async (req, res) => {
	let companies = [];
	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0
	};
	try {
		companies = await Services.company.find({}, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});

	}

	res.status(200).json({
		status: 'success',
		data: companies
	});
};

const remove = async (req, res) => {
	const criteria = {
		_id: req.params.id
	};
	try {
		await Services.company.deleteOne(criteria);
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
