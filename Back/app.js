//import des modules et fichiers complémentaires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

//importation des routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

const app = express();

//Utilise le package bodyParser
app.use(bodyParser.json());
//Sécurisation des Headers
app.use(helmet());

// Met en place les headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin-list, X-Requested-With, Content, Accept, Content-Type, Authorization, userId');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Definition des routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);


module.exports = app;

