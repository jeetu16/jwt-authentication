const usersDB = {
    users: require("../model/usersModel.json"),
    setUsers: function(data) { this.users = data }
}
const path = require('path');
const fsPromises = require('fs').promises;

const jwt = require('jsonwebtoken');



const handleLogout = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt

    // is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken===refreshToken);

    if(!foundUser) {
        res.clearCookie('jwt',{ httpOnly:true, maxAge:24*60*60*1000 });
        return res.sendStatus(204)
    }
    // Delete refreshToken in db
    const otherUsers = usersDB.users.filter((user) => user.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken:'' }
    usersDB.setUsers([...otherUsers, currentUser]);
    
    await fsPromises.writeFile(
        path.join(__dirname,"..","model","usersModel.json"),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie('jwt', { httpOnly:true, maxAge: 24*60*60*1000 })
    res.sendStatus(204);
}

module.exports = handleLogout;