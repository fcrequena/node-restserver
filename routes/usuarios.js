const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeCorreo, existeIdUsuario } = require('../helpers/db-validators')
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete 
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
//si enviamos dos parametros, seria la ruta y el controlador.
//si enviamos tres ruta, midellware y controlador.
//en el caso queramos enviar varios midellware, enviamos un array. 
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(), 
    check('contrasena', 'El password no es valido.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom( existeCorreo ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    /*aca el custome recibe el rol y con una funcion de flecha se lo enviariamos a la funcion
        esRoleValido, de esta manera <  check('rol').custom( (rol) => esRoleValido(rol) ) > 
        pero como el primer el argumento que recive la funcion es rol y el argumento que enviamos 
        a la funcion esRoleValido. podemos omitir la funcion y colocar solo la referencia a la funcion 
        esRoleValido. 
        asi  check('rol').custom(esRoleValido)
        el primer parametro que revice custome, es el que revice el esRoleValido
    */
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
                check('id', 'El id no es valido').isMongoId(),
                check('id').custom( existeIdUsuario ),
                validarCampos
            ], usuariosDelete);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeIdUsuario ),
    validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);

module.exports = router;