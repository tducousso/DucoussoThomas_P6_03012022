/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Sauce = require('../models/sauce') //Le schéma de nos sauces
const fs = require('fs') //File system de node, permet de delete nos images
const sauce = require('../models/sauce')

/*********************************************************************************/
//Nos routes "Get"

exports.getAllSauces = (req, res, next) => { //Pour obtenir toutes nos sauces 
    Sauce.find() //on utilise .find de mangoose pour chercher sur la database nos Sauces.
        .then(sauces => res.status(200).json(sauces)) //Ensuite, on renvoie une réponse positive avec les dites sauces.
        .catch(err => res.status(500).json({err}))  
}

exports.getOneSauce = (req, res, next) => { //Pour obtenir une seule sauce    
    Sauce.findOne({ _id: req.params.id}) //On cherche la sauce par son id.
        .then(sauce => res.status(200).json(sauce)) //Ensuite, on renvoie une réponse positive avec la dite sauce.
        .catch(err => res.status(500).json({err}))  
}

/*********************************************************************************/
//Nos routes post.

exports.createSauce = (req, res, next) => { //Pour créer une sauce.
    const sauceObject = JSON.parse(req.body.sauce) //On récupère sous format JSON les données sauce du Frontend
    delete sauceObject._id //on enlêve l'ID.
    const sauce = new Sauce({ //On créer un nouvelle objet Sauce
        ...sauceObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //On gêre l'URL de notre image
        likes: 0, //On met sur une valeur de base nos tableaux et nos likes/dislikes
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    }); 
    sauce.save() //On sauvegarde cette sauce sur la database avec save.
        .then(() => res.status(200).json({message: 'Sauce sauvegardée'})) //On envoie une réponse positive 200.
        .catch(error => res.status(400).json({ error })) 
}

exports.likesDislikes = (req, res, next) => {  //Pour gêrer les likes et les dislikes.
    if (req.body.like === 1) { //Comme indiquer sur les instructions, une valeur de "1" équivaux a un like.
        Sauce.updateOne( //On utilise 'UpdateOne()' pour mettre à jour les likes notre sauce.
            {_id: req.params.id}, //La sauce qu'on update est définie par son ID
            {  $inc: { likes: +1}, //On utilise $inc de MangoDB pour incrémenter nos likes par 1
            $push: { usersLiked: req.body.userId} })  //On utilise $push de MangoDB pour push notre utilisateur dans le tableau.
            .then((sauce) => res.status(200).json({ message: 'Yummy :)'})) //On renvoie une réponse positive 200
            .catch(error => res.status(400).json({ error })) 
    } 
    else if (req.body.like === -1) { //Comme indiquer sur les instructions, une valeur de "-1" equivaux à un dislike.
        Sauce.updateOne(  //On utilise 'UpdateOne()' pour mettre à jour les likes notre sauce.
            {_id: req.params.id}, //La sauce qu'on update est définie par son ID
            {$inc: { dislikes: +1}, //On utilise $inc de MangoDB pour incrémenter nos dislikes par 1
            $push: { usersDisliked: req.body.userId }})  //On utilise $push de MangoDB pour push notre utilisateur dans le tableau.
            .then(() => res.status(200).json({ message: 'Not yummy :('})) 
            .catch(error => res.status(400).json({ error })) 
    }  
    else { //Sinon, la valeur est de 0; comme indiquer sur les instructions, cela équivaux à une annulation d'un like/dislike.
        Sauce.findOne({ _id: req.params.id }) //En ce cas on commence par trouver notre sauce via son ID.
        .then(sauce => { 
            if (sauce.usersLiked.includes(req.body.userId)) {  //Si l'utilisateur est présent dans le tableau des likes
                Sauce.updateOne({ _id: req.params.id }, //On update la dite sauce.
                    { $pull: { usersLiked: req.body.userId }, //On enlève pour commencer l'utilisateur du tableau likes
                    $inc: { likes: -1},}) //et on enlève un like.
                .then(() => res.status(200).json({ message: 'like removed'})) 
                .catch(error => res.status(400).json({ error })) 

            } else if (sauce.usersDisliked.includes(req.body.userId)) { //Sinon, si l'utilisateur est présent dans le tableu dislikes.
                Sauce.updateOne( {_id: req.params.id}, //On update la dite sauce
                    {$pull: {usersDisliked: req.body.userId}, //On enlève pour commencer l'utilisateur du tableau dislikes
                    $inc: { dislikes:  -1},}) //et on enlève un dislike
                .then(() => res.status(200).json({ message: 'Dislike removed'})) 
                .catch(error => res.status(400).json({ error })) 
            }
        })
    }
}

/*********************************************************************************/
//Nos routes put

exports.modifySauce = function (req, res, next) { //Pour modifier une sauce
    const sauceObject = req.file? //On vérifie si il y a une nouvelle image ou pas.
    { //Si il y a une image 
        ...JSON.parse(req.body.sauce), //On récupère au format Json les nouvelles données
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On gêre l'URL de notre image.
    }  
    : {...req.body} //Sinon on récupère simplement les nouvelles données
    sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}) //On update ensuite la sauce dans notre database (par rapport à son ID)
    .then(() => res.status(200).json({Message: 'Sauce modifiée'})) //On envoie une réponse positive 200
    .catch(error => res.status(400).json({ error })) //Sinon, un message d'érreur
}

/*********************************************************************************/
//Nos routes delete

exports.deleteSauce = (req, res, next) => { //On supprime une sauce
    Sauce.findOne({_id: req.params.id}) //On trouve la sauce en question par son ID dans la requête
        .then( sauce => { 
            const filename = sauce.imageUrl.split('/images/')[1] //on split l'Url de notre image pour obtenir le nom fichier seulement
            fs.unlink(`images/${filename}`, () => { //via ce nom, on supprime l'image de la sauce en question.
                sauce.deleteOne({_id: req.params.id}) //Ensuite, on supprime la sauce avec deleteOne de MangoDB
                    .then(() => res.status(200).json({message: 'Sauce supprimée'})) //On renvoie une réponse positive 200
                    .catch(error => res.status(400).json({error: error})) //Sinon, un message d'érreur
            })
        })
}