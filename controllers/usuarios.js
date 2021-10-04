const { response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//para obtener el tipado clocamos el req=request
const usuariosGet = async(req=request, res = response) => {
    
    // const request = req.query;
    // console.log(request);

    //destructuracion
    // const { q, nombre, apikey, page = 1, limit = 100} = req.query;
    
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find( {estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments( {estado: true} );

    // res.json({
    //     total,
    //     usuarios
    // })

    const [usuarios, total] = await Promise.all([
        Usuario.find( {estado: true})
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments( {estado: true} )
    ]);

    res.json({
        total,
        usuarios
    })

}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, contrasena, rol} = req.body;

    //crea el esquema en mongo
    const usuario = new Usuario( { nombre, correo, contrasena, rol }  );

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.contrasena = bcryptjs.hashSync( contrasena, salt );

    //para guardar los datos utilizamo
    await usuario.save();

    res.json({
        "msg": "POST API - controlador",
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    console.log(req, res)

    const id = req.params.id;
    const { _id, contrasena, google, correo,...resto} = req.body;
    
    //validaciones
    if(contrasena){
        //encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.contrasena = bcryptjs.hashSync( contrasena, salt );

    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario)
}

const usuariosPatch =(req, res = response) => {
    res.json({
        "msg": "PATCH API - controlador"
    })
}

const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params;

    //Eliminamos el registro
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    //actualizamos el estado del formulario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        // "msg": "DELETE API - controlador",
        // id: id
        usuario
    })
}

module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosPut
}