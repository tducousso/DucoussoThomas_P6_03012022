const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);

/*
La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
La méthode  model  transforme ce modèle en un modèle utilisable.
Ce modèle vous permettra non seulement d'appliquer notre structure de données, mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données.
*/