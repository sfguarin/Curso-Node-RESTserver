
//importación del modelo rol que cree para hacer la validación del rol ingresado por el usuario
const Role = require('../models/role');

//Importación del modelo Usuario que se creo para hacer la validación del email ingresado por el usuario
const Usuario = require('../models/usuario');


const esRoleValido = async(rol='')=>{
    //pregunto si el rol ingresado existe en la base de datos (colección que se creo previamente) e
    //importo el modelo para el rol que cree Role
    const existeRol = await Role.findOne({rol});
    //si no existe el rol dentro de la base de datos arrojo un mensaje de error 
    if(!existeRol){
            throw new Error (`El rol ${rol} no está en la BD`)
    }
}


const emailExiste = async( correo='' ) => {

    //Verificar si el correo existe, esto es un boolean que busca si existe en la base de datos un correo repetido
    //por otro usuario que ya se registro {correo:correo} = {correo} significa lo mismo
    const existeEmail = await Usuario.findOne({ correo });
    //Se pone el if para que en caso de que ya exista el correo en la base de datos se retorne un error y se pare
    //la ejecución de la función arrojando el error  
    if (existeEmail) {
      throw new Error (`El correo ${correo} ya existe`)
    }

}

//validación personalizada de si el id que manda el usuario existe o no dentro de la base de datos
const idExiste = async( id ) => {

    //Verificar si el id existe, esto es un boolean que busca si existe en la base de datos el id ingresado
    const existeId = await Usuario.findById(id);
    //Se pone el if para que en caso de que no exista el id en la base de datos se retorne un error y se pare
    //la ejecución de la función arrojando el error  
    if (!existeId) {
      throw new Error (`El id ${id} no existe para ningun usuario`)
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    idExiste
}