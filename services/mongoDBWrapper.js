'use strict';

const Models = require('../models');

module.exports = (model) => {
	const module = {};

	module.find = async (criteria, projection, options) => {
		options.lean = true;
		return await Models[model].find(criteria, projection, options);
	};

	module.findOne = async (criteria, projection, options) => {
		options.lean = true;
		return await Models[model].findOne(criteria, projection, options);
	};

	module.findById = async (id, projection, options) => {
		return await Models[model].findById(id, projection, options);
	};

	module.create = async (objToSave) => {
		const data = await new Models[model](objToSave).save();
		return data.toObject();
	};

	module.update = async (criteria, dataToSet, options) => {
		options.lean = true;
		options.new = true;
		return await Models[model].findOneAndUpdate(criteria, dataToSet, options);
	};

	module.deleteOne = async (criteria) => {
		return await Models[model].deleteOne(criteria);
	};

	module.count = async (criteria) => {
		return await Models[model].countDocuments(criteria);
	};

	return module;
};
