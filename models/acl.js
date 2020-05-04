'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
	role: { type: String, required: true },
	resource: { type: String, required: true },
	action: { type: String, enum: ['create', 'read', 'update', 'delete'], required: true },
	possession: { type: String, enum: ['any', 'own'], default: 'any' },
	attributes: [{ type: String, default: '*' }]
}, {
	timestamps: true
});

module.exports = mongoose.model('acl', permissionSchema);
