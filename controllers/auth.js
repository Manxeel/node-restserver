const bcryptjs = require('bcryptjs');

const {request, response } = require('express');
const generarJWT = require('../helpers/generar-jwt');
const User = require('../models/user');


const loginPost = async(req = request, res = response) => {

    const {correo, password } = req.body
    
    try {
        // Verificar si email existe
        const user = await User.findOne({ correo })
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/Password Incorrectos'
            })
        }
        // verificar si usuario está activo
         if (!user.estado) {
            return res.status(400).json({
                msg: 'Estado de la cuenta bloqueado.'
            })
        }       
        // verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password Incorrectos.'
            })
        }
        // generar jwt
        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hablar con administrador'
        })
    }
}

module.exports = loginPost;