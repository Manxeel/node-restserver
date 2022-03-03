const { response } = require("express")



const adminRole = (req , res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        })    
    }
    const { rol, nombre } = req.user;
    
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No puedes realizar esta accion`
        })
    }
    
    next();
}
const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {
    
        if (!req.user) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            })
        }
     
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                    msg: `Para acceder necesitas uno de estos Roles: ${roles}`
            })
        }
        next();
    }

}

module.exports = {
    adminRole,
    tieneRole
}