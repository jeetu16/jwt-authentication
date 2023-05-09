const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    // checks non empty value
    if (!username || !password) return res.status(400).json({ "message": "Username and password require" })

    // check user is exist or not
    const foundUser = await User.findOne({username:username})
    if (!foundUser) {
        return res.sendStatus(404); // unauthorized
    }

    // checking user password is correct or incorrect
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Saving refreshToken with current user in DB
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // await User.updateOne({_id:foundUser._id},{refreshToken:refreshToken});

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(201).json({ roles, accessToken })

    } else {
        res.sendStatus(401);
    }

}


const logoutUser = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(400).json({"message":"Bad request"}); // no content
    const refreshToken = cookies.jwt

    // is refreshToken in DB?
    const foundUser = await User.findOne({refreshToken:refreshToken}).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204)
    }
    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite:'None' ,maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).json({ "message": `${result.username} successfully logout `});
}

module.exports = {
    loginUser,
    logoutUser
};