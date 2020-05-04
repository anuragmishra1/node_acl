'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
	let decoded;
	let token = req.headers['authorization'].split(' ')[1];
	try {
		decoded = jwt.verify(token, process.env.JWT_TOKEN);
	} catch (err) {
		return res.status(401).send({
			status: 'failure',
			message: err.message || 'Email or password is incorrect'
		});
	}

	req.userData = {
		id: decoded.id,
		role: decoded.role
	};
	next();
};

module.exports = {
	checkAuth
};
