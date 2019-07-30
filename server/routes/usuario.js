const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const app = express();
const User = require('../models/usuario')

app.get('/usuario', function(req, res) {

    let skip = Number(req.query.skip || 0);
    let limit = Number(req.query.limit || 5);

    User.find({ status: true }, 'name email img')
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            })
        })
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: usuarioDB
        });
    })
})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['name', 'email', 'img']);

    User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, usuario: userDB });
    })

})

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({ ok: true, user });
    })
})

module.exports = app;