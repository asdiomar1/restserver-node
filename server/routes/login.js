const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const guid = require('uuid/v4');
const User = require('../models/usuario');
const encryptor = require('../utils/encryptor');

const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User and Password do not match'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Password and User do not match'
                }
            });
        }

        //Genero token no encriptado para usuario
        let token = guid();

        //Encripto token para DB
        // let tokenHash = jwt.sign({
        //     token: token,
        // }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_VALIDTY });

        //let tokenHash = bcrypt.hashSync(token, 10);

        let tokenHash = encryptor.encrypt(token);

        console.log('Tokenhash login', tokenHash);

        // Actualizo el token hasheado del usuario
        userDB.token = tokenHash;
        userDB.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        });

        // Retorno respuesta
        res.json({
            ok: true,
            token
        });
    })
});


module.exports = app;