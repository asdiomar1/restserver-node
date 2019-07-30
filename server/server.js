require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true })
    .then(() => {
        console.log("URL de coneccion: ", process.env.URLDB);
        console.log("Base de datos ONLINE");
    })
    .catch((err) => {
        console.error(`Mongoose connection error: ${err}`);
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});