const express = require('express');
const router = express.Router();
const registerHandler = require('../controller/register.controller');

router.post('/',registerHandler)

module.exports = router;