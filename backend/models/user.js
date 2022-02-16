//Importation de mongoose pour utiliser son système de modèle
const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator"); //unique validator empeche les utilisateurs d'avoir le meme email

/* Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in,
   s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail. */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //'Required: true' permet de forcer à avoir un password.
});

//UniqueValidator vérifie les données et renvoie des érreur comprehensives.
userSchema.plugin(uniqueValidator);

//Exportation du schema
module.exports = mongoose.model("User", userSchema);

