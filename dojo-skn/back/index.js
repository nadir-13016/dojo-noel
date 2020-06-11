const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
var bodyParser = require('body-parser')

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}));

app.get('/api/enfantcadeau', (req, res) => {
    connection.query('SELECT * from enfant AS enf JOIN cadeaux AS ca ON ca.ID = enf.cadeaux_ID', (err, results) => {
        if (err) throw err
        res.send(results);
    })
});
app.get('/api/enfant', (req, res) => {
    connection.query('SELECT * from enfant ', (err, results) => {
        if (err) throw err
        res.send(results);
    })
});
app.post('/api/cadeau', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO cadeaux set ?', formData, (err, results) => {

        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'ajout d'un cadeau");
        } else {
            res.sendStatus(200);
        }
    });
})
    app.put('/api/enfant/:firstname', (req, res) => {
 
        // récupération des données envoyées
        const firstnameEnfant = req.params.firstname;
       const formData = req.body;
        // connexion à la base de données, et suppression de l'employé
        connection.query('UPDATE enfant set cadeaux_ID= null  WHERE sagesse = 0 and firstname = ?', [firstnameEnfant], err => {
       
          if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la suppression d'un cadeau");
          } else {
       
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
          }
        });
      });
       




    app.listen(port, (err) => {
        if (err) {
            throw new Error('Something bad happened...');
        }

        console.log(`Server is listening on ${port}`);
    });

