const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost' , // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'N@d!r-13', // le mot de passe
database :  'dojo_noel', // le nom de la base de données
});
module.exports = connection;