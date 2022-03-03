const Role = require('../models/role'); 
const User = require('../models/user')


const esRoleValido = async (rol = '') => {
        const existeRol = await Role.findOne({ rol });
        if (!existeRol) {
            throw new Error(`El rol: ${rol} no está registrado en la BD`)
        }
}

const existeEmail = async (correo) => {
    const existeEmail = await User.findOne({ correo });
        if (existeEmail) {
            throw new Error(`El correo: ${correo} ya está registrado`)
        }
}
const existeUserId = async (id) => {
    const existeUser = await User.findById(id)
        if (!existeUser) {
            throw new Error(`El id no existe: ${id}`)
        }
}
module.exports = {
    esRoleValido,
    existeEmail,
    existeUserId
}