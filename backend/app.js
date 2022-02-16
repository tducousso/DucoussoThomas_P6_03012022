// Importe les modules
require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)
const express = require('express');
const helmet = require('helmet'); //élément de sécurité. Helmet securise les headers.
const mongoose = require('mongoose');

// Importe les routes user et sauce
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce')
const path = require('path'); //module node qui sert à cacher notre adresse Mongo (marche avec dotenv)

const app = express(); // application d'express

// Connexion mongoDB
mongoose
  .connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json()); //Equivalent de bodyparser qui n'est plus utiliser.
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // crossOrigin pour pouvoir afficher mes images
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

/****************************************************************/
//On exporte notre application.

module.exports = app;