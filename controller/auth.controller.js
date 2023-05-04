const usersDB = {
    users: require('../model/usersModel.json'),
    setUsers : function(data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fsPromises = require('fs').promises;
require('dotenv').config();



const authHandler = async (req, res) => {
    const { user, pwd }  = req.body;
    
    // checks non empty value
    if(!user || !pwd) return res.status(400).json({ "message": "Username and password require"})

    // check user is exist or not
    const foundUser = usersDB.users.find(person => person.username === user)

    if(!foundUser) {
        return res.sendStatus(401); // unauthorized
    }

    // checking user password is correct or incorrect
    const match = await bcrypt.compare(pwd,foundUser.password);

    if(match) {

        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter((user) => user.username!==foundUser.username)
        const currentUser = {...foundUser, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,"..","model",'usersModel.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt',refreshToken,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(201).json({ accessToken })
    } else {
        res.send(401);
    }

}

module.exports = authHandler;