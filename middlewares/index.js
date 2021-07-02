

const validarCampos = require('./validar-campos')
const validarCategoria = require('./validar-categoria')
const validarJWT = require('./validar-jwt')
const validarRoles = require('./validar-roles')


// Se utiliza los 3 puntos para exportar todo lo que traiga ese
// archivo para exportar, si no lo hago asi ocurre un error
module.exports = {
    ...validarCampos,
    ...validarCategoria,
    ...validarJWT,
    ...validarRoles
}