'use strict';

module.exports = {
	user: require('./mongoDBWrapper')('user'),
	acl: require('./mongoDBWrapper')('acl'),
	company: require('./mongoDBWrapper')('company')
};
