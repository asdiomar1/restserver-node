//==========================
//  PUERTO
//==========================
process.env.PORT = process.env.PORT || 3000;



//==========================
//  ENTORNO
//==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB = '';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://andres:andres@cluster0-h4x0u.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;