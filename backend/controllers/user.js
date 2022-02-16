//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.
require('dotenv').config();

/*********************************************************************************/
//notre middleware signup, pour créer un compte

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) //on hash le password avec un salt de 10, le salt ajout du texte aléatoire au hash.
    .then(hash => {
      const user = new User({ //on créer ensuite notre user 
        email: req.body.email, //on prend le mail envoyer par le frontend
        password: hash //et le password qui est maintenant hash
      });
      user.save() //on sauvegarde notre user sur la database.
        .then(() => res.status(200).json({ message: "Nouveau compte utilisateur créé !" })) //On renvoie une réponse positive 200
        .catch(error => res.status(400).json({ message: Object.keys(error.errors).map(key => error.errors[key].message).join('\n') })) //Sinon un message d'érreur (si même email)
    })
    .catch(error => res.status(500).json({ message: 'Something went wrong ...' }))  //Sinon un message d'érreur (si serveur)
}

/*********************************************************************************/
//notre middleware de login, pour ce connecter.

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) //findOne, de mangoose, permet de trouver notre via l'Email
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      bcrypt.compare(req.body.password, user.password) //compare le mdp rentré et celui dans la base de donnée.
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password' })
          }
          res.status(200).json({ //sinon on renvoie le User._id que le frontend demande, ainsi qu'un token.
            userId: user._id,
            token: jwt.sign( //on génère notre token via .sign de JsonWebToken
              { userId: user._id }, //le token est créer via le User._id.
              process.env.SECRET_TOKEN, // le token est stocké dans le fichier .env
              { expiresIn: '24h' } //le dit token expire après 24h.
            )
          })
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error });
        }); //Sinon un message d'érreur
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
}




/*
1- exports.signup
nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois. Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé. Pour plus d'informations, consultez la documentation de bcrypt ;
il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec. 

2- exports.login
nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :
dans le cas contraire, nous renvoyons une erreur 401 Unauthorized ,
si l'e-mail correspond à un utilisateur existant, nous continuons ;
nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :
s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe incorrect ! »,
s'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. Ce token est une chaîne générique pour l'instant, mais nous allons le modifier et le crypter dans le prochain chapitre.
Puis
apres res.status(200).json({ : 
nous utilisons la fonction sign de jsonwebtoken pour encoder un nouveau token ;
ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) ;
nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production) ;
nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures ;
nous renvoyons le token au front-end avec notre réponse.
*/