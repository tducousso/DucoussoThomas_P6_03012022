//On importe nos package
const http = require('http'); //depuis node
const app = require('./app'); //notre application 

/*********************************************************************************/
//Notre fonction normalizePort cherche un port sous forme de chiffre ou de chaine.

const normalizePort = val => {
  const port = parseInt(val, 10);

  //Si ce n'est pas un nombre
  if (isNaN(port)) {
    return val;
  }
  //Si c'est un numbre
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); //Si nous avons un port valide, on l'utilise, sinon on prend le port 3000 par défaut
app.set('port', port); 


/*********************************************************************************/
//Fonction en cas d'érreurs. 

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/*********************************************************************************/
//On créer notre server

const server = http.createServer(app);

/****************************************************************/
//On lance notre server avec ces paramètres

server.on('error', errorHandler); //si une érreur; on passe sur errorHandler
server.on('listening', () => { 
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind); 
});

server.listen(port);  //On écoute sur le port définie par normalizePort

/*********************************************************************************/

/*
Aperçu rapide de ce qui se passe ici :

la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;

la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;

un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.

Notre serveur de développement Node est à présent opérationnel. Vous pouvez ainsi ajouter les fonctionnalités appropriées à l'application Express.
*/