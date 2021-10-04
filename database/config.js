const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {

        await mongoose.connect(process.env.MONGODB_CNN,{
            // useNewUrlParse: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de datos conectado')
    } catch (error) {
     
        console.log('Error en conexion: ',error)
        throw new Error('Error en la base de datos');
    
    }
}

module.exports = {
    dbConnection
}