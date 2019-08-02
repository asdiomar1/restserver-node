//==========================
//  PUERTO
//==========================
process.env.PORT = process.env.PORT || 3000;


//==========================
//  ENTORNO
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==========================
//  BASE DE DATOS
//==========================
let urlDB = '';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//==========================
//  Validez TOKEN
//==========================
process.env.TOKEN_VALIDTY = 60 * 60 * 24 * 30;

//==========================
//  TOKEN Seed
//==========================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'this-is-the-seed-of-development';

//==========================
//  TOKEN SALT
//==========================
process.env.TOKEN_SALT = process.env.TOKEN_SALT || 'salt';

//==========================
//  TOKEN ALGORITHM
//==========================
process.env.TOKEN_ALGORITHM = process.env.TOKEN_ALGORITHM || 'aes-192-cbc';