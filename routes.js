'use strict';

const express = require('express');
const router = express.Router();
require('dotenv').config();
const { user, acl, company } = require('./controllers');
const { accesscontrol, auth } = require('./utils');

// Load Permissions
accesscontrol.loadPermission();

// Users Routes
router.post('/user/login', user.login);
router.post('/user', user.create);
router.get('/users', auth.checkAuth, accesscontrol.checkPermission('user', 'read'), user.getAll);
router.delete('/user/:id', auth.checkAuth, accesscontrol.checkPermission('user', 'delete'), user.remove);

// ACL Routes
router.post('/acl', auth.checkAuth, acl.create);
router.get('/acl', auth.checkAuth, acl.getAll);
router.delete('/acl/:id', auth.checkAuth, acl.remove);

// Companies Routes
router.post('/company', auth.checkAuth, accesscontrol.checkPermission('company', 'create'), company.create);
router.get('/companies', auth.checkAuth, accesscontrol.checkPermission('company', 'read'), company.getAll);
router.delete('/company/:id', auth.checkAuth, accesscontrol.checkPermission('company', 'delete'), company.remove);

module.exports = router;
