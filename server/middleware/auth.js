const User = require('../models/usuario');
const encryptor = require('../utils/encryptor');

module.exports.isAuthorized = function(req, res, next) {

    let token = req.headers['Authorization'];
    if (token == null) {
        return res.status(401).json({
            ok: false,
            message: 'Debe enviar un token valido'
        });
    }

    let tokenHash = encryptor.encrypt(token);

    User.findOne({ token: tokenHash }).exec(function(error, user) {
        if (error) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else if (user != null) {
            return next();
        } else {
            return res.status(401).json({
                ok: false,
                message: 'El token es invalido'
            });
        }
    });
}