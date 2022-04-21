const jwt = require('jsonwebtoken');

// Verificar Token
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // Obteniendo el valor de token desde el header

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};

// Verificar Admin_Role
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No tiene privilegios para realizar la operación'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole
}