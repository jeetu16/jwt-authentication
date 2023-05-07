const User = require('../model/User');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': `User name and password are required` });
    }
    
    // check for duplicate user in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409) // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        // store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd
        });
        res.status(201).json({ 'message': `New User ${username} Successfully created` })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 'message': err.message });
    }
}


const deleteUser = async (req, res) => {

    if (!req?.body?._id) return res.status(400).json({ "message": `Please provide User ID` });

    try {

        // deleting user from database
        const findUser = await User.findByIdAndDelete(req.body._id)
        // sending response if user not found 
        if (!findUser) return res.status(404).json({ message: `Not found any user with username ${username}` });
        res.status(200).json({ message: `Successfully Deleted user ${username}` });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ "message": err.message })
    }
}

const getAllUsers = async (req,res) => {
    const users = await User.find({},{_id:0,__v:0,password:0,refreshToken:0})
    res.status(200).json(users);
}

module.exports = {
    deleteUser,
    registerUser,
    getAllUsers
};