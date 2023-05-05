const express = require('express');
const handleLogout = require('../controller/logout.controller');
const router = express.Router();


router.get('/',handleLogout);

module.exports = router;