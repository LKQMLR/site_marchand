import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';

// Permet l'utilisation du module dotenv
dotenv.config();

// VARIABLE
const app = express();
const PORT = process.env.PORT;


// MIDDLEWARE

// Permet de servir des fichiers static depuis le dossier public.
app.use(express.static('public'))
// Permet de traiter les données soumis à un formulaire
app.use(express.urlencoded({extended : true}))
// Point de terminaison d'entrée pour toutes mes routes.
app.use('/', router);




// Lancement du serveur
app.listen(PORT, () => {
    console.log(`En attente de requêtes sur le port : ${PORT}`)
})