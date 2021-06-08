//esto se hace para que pueda tener acceso a las funciones de response por ejemplo que se autocomplete el 
//res.json
const {response, request} = require('express');

//Importación de paquete para manejar contraseñas
const bcryptjs = require('bcryptjs');

//Importación del modelo usuario para hacer la busqueda de todos los usuarios registrados en la base de datos
//con sus respectivas propiedades
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

//metodo del controlador que voy a utilizar para la autenticación, para una petición post
const login =  async (req = request, res = response) => {

    //Capturo las variables que necesito del body
    const {correo, password} = req.body;

    //try y catch por si algo sale mal 
    try {

        //Verificar si el usuario existe con el email suministrado
        const usuario = await Usuario.findOne({correo});
        if (!usuario){

            return res.status(400).json({
                msg: 'El email ingresado no corresponde a ningún usuario'
            })
        }

        //Verificar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario ingresado no se encuentra activo'
            })
        }

        //Verificar la contraseña. Aca importo mi paquete bcryptjs y utilizo el metodo compareSync que permite
        //comparar la contraseña que ingresa el usuario al momento de logearse (password) y la contraseña con la 
        //que se registro el usuario (usuario.password)
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'La contraseña ingresada no corresponde al usuario'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        //Respuesta cuando todo se ejecuta correctamente
        res.json({
            msg: 'Auth funcionando',
            usuario,
            token
        })
        
    } catch (error) {
        //Error por si sucede un error imprevisto, se supone que este catch no se debe disparar pero se pone 
        //por si acaso
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

//Exportación del controlador
module.exports = {
    login
}