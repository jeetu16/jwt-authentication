const bcrypt = require('bcrypt');
const path = require('path');
const fsPromises = require('fs').promises;
const usersDB = {
    users: require('../model/usersModel.json'),
    setUsers : function(data) { this.users = data }
}


const registerHandler =  async (req,res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd ) {
        res.status(400).json({ 'message': `User name and password are required`});
    }

    // check for duplicate user in the db
    const duplicate = usersDB.users.find((person) => person.username === user);
    if(duplicate) return res.sendStatus(409) // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd,10);
        // store the new user
        const newUser = { "username":user, "password":hashedPwd };
        usersDB.setUsers([...usersDB.users,newUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','usersModel.json'),
            JSON.stringify(usersDB.users)
        )
        res.status(201).json({'message': `New User ${user} Successfully created`})
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ 'message': err.message});
    }
}


module.exports = registerHandler;
