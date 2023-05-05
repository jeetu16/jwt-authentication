const jwt = require('jsonwebtoken');
const path = require('path');
const fsPromises = require('fs').promises;



const jwtVerify = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    console.log(authHeader);

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}

module.exports = jwtVerify;