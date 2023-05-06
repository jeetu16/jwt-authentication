const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles.list');
const jwtVerify = require('../middleware/jwtVerity');


router.route('/')
.delete(jwtVerify,userController.deleteUser);

module.exports = router;