'use strict';

const AccessControl = require('accesscontrol');
let ac = new AccessControl();
const services = require('../services');

const loadPermission = async () => {
	let grants = [];
	try {
		const projection = {
			_id: 0,
			createdAt: 0,
			updatedAt: 0,
			__v: 0
		};
		grants = await services.acl.find({}, projection, {});
	} catch (err) {
		throw err;
	}
	grantPermission(grants);
};

const grantPermission = (permissionList) => {
	ac.setGrants(permissionList);
	console.log(ac.getGrants());
};

const checkPermission = (resource, action, possession) => {
	return (req, res, next) => {
		let permission;
		permission = ac.permission({
			role: req.userData.role,
			resource: resource,
			action: action,
			possession: possession || 'any'
		});

		if (permission.granted) {
			next();
		} else {
			return res.status(403).send({
				status: 'failure',
				message: 'You are not authorised'
			});
		}
	};
};

const addGrant = (role, resource, action) => {
	ac.grant(role)[`${action}Any`](resource, ['*']);
};

const revokeGrant = (role, resource, action) => {
	ac.deny(role)[`${action}Any`](resource);
};

module.exports = {
	loadPermission,
	checkPermission,
	addGrant,
	revokeGrant
};
