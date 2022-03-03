const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // Conexion a base de datos
        this.conectarDB();
        // middlewares
        this.middlewares();
        // rutas
        this.routes();
    }
 
    async conectarDB() {
        await dbConnection();
    }
    middlewares() {
        // CORS - Permite uso de otros lugares
        this.app.use(cors());

        // Parseo y lectura de body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
        this.app.use(this.authPath, require('../routes/auth'))
    }
    
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;