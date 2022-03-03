const { response, request } = ('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, users] = await Promise.all([
        User.count(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        users
    })
}
const usuariosPut = async(req, res = response) => {
    const { id }  = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    // Validar 
    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    
    }
    const user = await User.findByIdAndUpdate(id, rest);

    res.json({user})
}
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });


    // Encriptar contrasea con Bcrypt ( hash )
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);


    // Guardar en bd
    await user.save();

    res.json({
        user
    })
}
const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {estado: false})
    res.json({
        user
    })
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}