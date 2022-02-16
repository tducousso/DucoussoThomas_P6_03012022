//On importe ce dont nous avons besoin et on créer notre router

const express = require('express')
const router = express.Router() //On annonce ce fichier comme router
const auth = require('../middleware/auth') 
const multer = require('../middleware/multer-config')
const sauceCtrl = require('../controllers/sauce')

/*********************************************************************************/
//Chaque route aura "Auth" qui permet d'authentifier l'utilisateur sur chaque demandes.

router.get('/', auth, sauceCtrl.getAllSauces) 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce); //On ajoute également multer après Auth ici, pour gêrer les images.
router.post('/:id/like', sauceCtrl.likesDislikes)
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //On ajoute multer ici également, pour gêrer les modifications d'images.
router.delete('/:id', auth, sauceCtrl.deleteSauce);

/*********************************************************************************/
//On exporte notre module.

module.exports = router