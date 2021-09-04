const { response, request} = require('express');
//para obtener el tipado clocamos el req=request
const usuariosGet =(req=request, res = response) => {
    
    // const request = req.query;
    // console.log(request);

    //destructuracion
    const { q, nombre, apikey, page = 1, limit = 100} = req.query;
    
    res.json({
        "msg": "Get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost =(req, res = response) => {

    const body = req.body;

    res.json({
        "msg": "POST API - controlador",
        body
    })
}

const usuariosPut =(req, res = response) => {

    const id = req.params.id;
    
    res.json({
        "msg": "PUT API - controlador",
        id
    })
}

const usuariosPatch =(req, res = response) => {
    res.json({
        "msg": "PATCH API - controlador"
    })
}

const usuariosDelete =(req, res = response) => {
    res.json({
        "msg": "DELETE API - controlador"
    })
}




module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosPut
}