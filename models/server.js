const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';



        //Middlewares (Siempre se van a ejecutar cuando se leventa el servidor) (siempre van con use())
        //Cuando se declara el public ya no sirve el routes (/) ya que el server lee primeramente la carpeta public
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'))

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port } `);
        });
    }


}

module.exports = Server;