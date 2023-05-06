const usersDB = {
    users: require("../model/usersModel.json"),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt

    // is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) return res.sendStatus(401);

    // evaluate jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username)
                return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        'username': decoded.username,
                        'roles': roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ accessToken })
        }
    )

}

module.exports = handleRefreshToken;