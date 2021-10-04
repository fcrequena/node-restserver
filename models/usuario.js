const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contrasena es obligatorio.']
    },
    img: { 
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

UsuarioSchema.methods.toJSON = function() {
    //destructuramos, quitamos el __v y password 
    //y todos los demas se almacenaran en usuario
    // console.log(this.toObject())
    const {__v, contrasena, ...usuario} = this.toObject();
    return usuario;
}

//para exportar el modelo, necesitamos el nombre en singular y 
// el esquema que acabamos de crear
module.exports = model('Usuario', UsuarioSchema);