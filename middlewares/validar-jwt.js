const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const validarJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY);
        
        // leer usuario que corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "TOKEN: Usuario no existe en DB"
            })
        }
        // Verificar rol del usuario
        
        // Verificar estado en true del usuario
        if (!user.estado) {
            return res.status(401).json({
                msg:'TOKEN: Estado del usuario incorrecto'
            })
        }
        // Verificar 
        req.user = user
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    console.log(token)
}

module.exports = {
    validarJWT
}