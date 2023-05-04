const express = require('express');
const router = express.Router();
const deleteUser = require('../controller/deleteUser.controller');


router.route('/:userName')
.delete(deleteUser);

module.exports = router;