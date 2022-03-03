const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users')

const { esRoleValido, existeUserId , existeEmail } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet )
router.put('/:id', [
    check('id', 'La id no es válida').isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 carácteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    check('id', 'La id no es válida').isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
],usuariosDelete)





module.exports = router;