const express = require('express');
const router = express.Router();
const employeeController = require('../../controller/employee.controller');
const jwtVerify = require('../../middleware/jwtVerity');

router.route('/')
    .get(jwtVerify,employeeController.getAllEmployee)
    .post(employeeController.addEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

router.route('/:id').get(employeeController.getEmployee)

module.exports = router;

