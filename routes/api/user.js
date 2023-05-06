const express = require('express');
const authController = require('../../controller/auth.controller');
const userController = require('../../controller/user.controller')
const verifyRoles = require('../../middleware/verifyRoles');
const router = express.Router();
const ROLES_LIST = require('../../config/roles.list');  



router.post('/loginUser',authController.loginUser);
router.get("/logoutUser",authController.logoutUser);
router.get("/getUsers",verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), userController.getAllUsers);
router.post('/registerUser', userController.registerUser);
router.delete('/deleteUser', userController.deleteUser);

module.exports = router;