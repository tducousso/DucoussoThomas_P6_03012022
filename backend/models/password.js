//On importe ce dont nous avons besoin.
let passwordValidator = require('password-validator'); //Nous permet de simplifier l'utilisation des regex.

//On créer un schéma que les mots de passe utilisateur doivent respecter.

let schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)        // taille min: 8.
.is().max(30)      // taille max: 30.
.has().uppercase()  // doit avoir au moins une majuscule.
.has().lowercase()  // doit avoir des minuscules
.has().digits()    // Au moins un nombre.
.has().not().spaces() // pas d'espaces                           

/*********************************************************************************/
//On exporte notre module.

module.exports = schema;