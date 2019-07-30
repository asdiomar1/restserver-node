require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

let mongooseOptions = {
    useNewUrlParser: true,
    useFindAndModify: false
}

mongoose.connect(process.env.URLDB, mongooseOptions, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

// mongoose.connect(process.env.URLDB, mongooseOptions)
//     .then(() => {
//         console.log("Base de datos ONLINE");
//     })
//     .catch((err) => {
//         console.error(`Mongoose connection error: ${err}`);
//     });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});