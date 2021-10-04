
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol= '') =>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta en la base de datos`);
    }
}

const existeCorreo = async(correo = '') => {
    const exite = await Usuario.findOne({ correo: correo });
    if( exite ){
        throw new Error(`El correo ${correo} ya existe`);
        // return res.status(400).json({
        //     msg: 'El correo ya registrado'
        // })
    }    
}

const existeIdUsuario = async(id) => {
    
    const exiteIdUsuario = await Usuario.findById(id);
    if (!exiteIdUsuario){
        throw new Error(`El id no es valido`)
    }
}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeIdUsuario
}