//middleware d'authentification : vérifie les autorisations avant de permettre une action
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //on split le header de la requête pour n'avoir que le token.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //On décode le token via notre clef secrête
        const userId = decodedToken.userId; //on met le token dans une constante pour vérification.

        if(req.body.userId && req.body.userId !== userId) { //Si le userID de la requête ne correspond pas au token.. error
            throw 'User ID non valable !';
        }
        else {
            next();  //Sinon on appel notre prochain middleware.
        }
    } catch {
        res.status(401).json({
            error : new Error("Requête non authentifiée !")
    });
    }
};

/*
nous extrayons le token du header Authorization de la requête entrante. N'oubliez pas qu'il contiendra également le mot-clé Bearer . Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch ;
nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;
nous extrayons l'ID utilisateur de notre token ;
si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur ;
dans le cas contraire, tout fonctionne, et notre utilisateur est authentifié. Nous passons l'exécution à l'aide de la fonction next() .
*/