// Importe les modules
const express = require('express');
const mongoose = require('mongoose');

// Importe les routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Création d'une application express
const app = express(); 

// const Thing = require('./models/thing');
const path = require('path');

//Connexion MongoDB
mongoose.connect('mongodb+srv://admin:tytyty2502@clusterp6.egagw.mongodb.net/ClusterP6?retryWrites=true&w=majority', 
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

app.use(express.json()); // extrait le corps JSON
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

