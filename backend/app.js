// Importe les modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');


// Importe les routes user et sauce
const userRoutes = require('./routes/user'); //Notre router utilisateur
const saucesRoutes = require('./routes/sauce') //Notre routeur Sauce
const path = require('path'); //Module node qui sert à cacher notre addresse Mongo

const app = express(); //application d'express

//Connexion MongoDB
mongoose.connect('mongodb+srv://testadmin:GTjPvAgLyKYKe3pN8NUfCAdUX@projet6.ja1l0.mongodb.net/projet6?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
 

 
//CORS « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer
app.use('/api/auth', userRoutes);
app.use('/api/sauce', saucesRoutes);

/****************************************************************/
//on exporte notre application.

module.exports = app;