const verifyRoles = (...allRoles) => {
    return (req,res,next) => {
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allRoles];
        console.log(rolesArray);
        console.log(req.roles);

        const result = req.roles.map((role) => rolesArray.includes(role)).find(user => user===true)

        if(!result) return res.sendStatus(403);

        next();
    }
}

module.exports = verifyRoles;