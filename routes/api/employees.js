const express = require('express');
const router = express.Router();
const employeeController = require('../../controller/employee.controller');
const ROLES_LIST = require('../../config/roles.list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeController.getAllEmployee)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.addEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee)

router.route('/:id').get(employeeController.getEmployee)

module.exports = router;

