'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
	company_name: { type: String, required: true },
	no_of_employees: { type: String, required: true }
}, {
	timestamps: true
});

module.exports = mongoose.model('company', companySchema);
