/*********************************************************************************/
//On importe ce dont nous avons besoin.

const mongoose = require('mongoose')

/*********************************************************************************/
//Notre Schéma Sauce

//Création du modèle grâce a la methode schema puis on l'exporte pour etre utilisé dans expresse
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

/*********************************************************************************/
//On exporte notre module.

module.exports = mongoose.model('Sauce', sauceSchema)

/*
La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
La méthode  model  transforme ce modèle en un modèle utilisable.
Ce modèle vous permettra non seulement d'appliquer notre structure de données, mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données.
*/