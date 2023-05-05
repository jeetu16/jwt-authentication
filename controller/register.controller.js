const bcrypt = require('bcrypt');
const User = require('../model/User');


const registerHandler = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        res.status(400).json({ 'message': `User name and password are required` });
    }

    // check for duplicate user in the db
    const duplicate = await User.findOne({username:user}).exec();
    if (duplicate) return res.sendStatus(409) // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });
        res.status(201).json({ 'message': `New User ${user} Successfully created` })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = registerHandler;
