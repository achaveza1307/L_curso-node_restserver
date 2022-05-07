//==========
//  Puerto
//==========
process.env.PORT = process.env.PORT || 3000;

//==========
//  Entorno
//==========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================
//  Vencimiento del token
//========================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 120;

//========================
//  SEED de autenticación
//========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//================
//  Base de datos
//================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Jason:7I2PFgH9lrn89cTV@cluster0.zebxd.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

//===================
//  Google Client Id
//===================
process.env.CLIENT_ID = process.env.CLIENT_ID || '138776966665-9m32m27j7tv8hcghjnr0b8j2age2aiiv.apps.googleusercontent.com';