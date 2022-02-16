//On importe ce dont nous avons besoin.
const multer = require('multer'); //multer permet de gêrer les fichiers dans no requêtes

//On Configure Multer

const MIME_TYPES = { //On traduit nos extensions via leurs mimetypes
  'image/jpg' : 'jpg', 
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
};

const storage = multer.diskStorage({  //On créer un objet de configuration pour multer, qu'on enregistre sur disque.
  destination: (req, file, callback) => { 
    callback(null, 'images'); //On indique ou les fichiers sont sauvegardés
  },
  filename: (req, file, callback) => { //On genère le nom du fichier
    const name = file.originalname.split(' ').join('_'); //On remplace les espaces du nom d'origine et on ajoute des "_"
    const extension = MIME_TYPES[file.mimetype]; //on genère l'extension.
    callback(null, name + Date.now() + '.' + extension); //et on ajoute la date précise (à la miliseconde prêt), et son extension après un "."
  }
});

/*********************************************************************************/
//On exporte notre module avec la méthode single (vu que c'est un fichier unique)

module.exports = multer({storage: storage}).single('image'); 




/*
Multer est un package de gestion de fichiers.

*/