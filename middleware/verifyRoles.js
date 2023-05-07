const verifyRoles = (...allRoles) => {
    return (req,res,next) => {
        const rolesArray = [...allRoles];
        if(!req?.roles) return res.status(401).json({"message":"Bad request"});
        const result = req.roles.map((role) => rolesArray.includes(Number(role))).find(user => user===true)

        if(!result) return res.status(403).json({"message":"You don't have permission to do this"});

        next();
    }
}

module.exports = verifyRoles;