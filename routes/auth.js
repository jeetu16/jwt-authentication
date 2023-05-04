const express = require('express');
const authHandler = require('../controller/auth.controller');
const router = express.Router();


router.route('/')
    .post(authHandler);


module.exports = router;