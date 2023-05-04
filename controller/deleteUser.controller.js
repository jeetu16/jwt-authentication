const usersDB = {
    users: require('../model/usersModel.json'),
    setUsers: function(data) { this.users = data }
}

const path = require('path');
const fsPromises = require('fs').promises;

const deleteUser =  async (req,res) => {

    // taking users parameter from the url using req.params
    const username = req.params.userName;
    console.log(username);

    // checking user existance
    const findUser = usersDB.users.find((user) => user.username === username);

    // sending response if user not found 
    if(!findUser) return res.status(404).json({ message: `Not found any user with username ${username}`});

    // deleting user from database
    const otherUsers = usersDB.users.filter((user) => user.username !== username);
    
    try{

        await fsPromises.writeFile(
            path.join(__dirname,"..","model","usersModel.json"),
            JSON.stringify(otherUsers)
        )
        res.status(200).json({ message: `Successfully Deleted user ${username}` });
    } catch(err) {
        console.log(err.message);
        res.status(500).json({message:err.message})
    }

    

    


}


module.exports = deleteUser;