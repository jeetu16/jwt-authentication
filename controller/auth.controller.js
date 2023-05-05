const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');



const authHandler = async (req, res) => {
    const { user, pwd } = req.body;

    // checks non empty value
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password require" })

    // check user is exist or not
    const foundUser = await User.findOne({username:user})
    console.log(foundUser);

    if (!foundUser) {
        return res.sendStatus(401); // unauthorized
    }


    // checking user password is correct or incorrect
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {

        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Saving refreshToken with current user
        await User.updateOne({_id:foundUser._id},{refreshToken:refreshToken});

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(201).json({ accessToken })

    } else {
        res.sendStatus(401);
    }

}

module.exports = authHandler;