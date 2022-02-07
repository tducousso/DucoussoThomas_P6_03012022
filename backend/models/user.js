//importation de mongoose pour utiliser son système de modèle
const mongoose = require("mongoose");

//importation de unique validator pour empecher les utilisateurs d'avoir le meme email
const uniqueValidator = require("mongoose-unique-validator");

/*Dans notre schéma, la valeur unique avec l'élément mongoose-unique-validator, 
 s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //'Required: true' permet de forcer à avoir un password.
});

//on applique unique Validator a notre schema
userSchema.plugin(uniqueValidator);

//exportation du schema
module.exports = mongoose.model("User", userSchema);

// Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.