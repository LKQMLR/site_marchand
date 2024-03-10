import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import session from 'express-session'

// Permet l'utilisation du module dotenv
dotenv.config();

// VARIABLE
const app = express();
const PORT = process.env.PORT;

// PARAMETRE
app.set('view engine', 'ejs');

// MIDDLEWARE

// Permet de servir des fichiers static depuis le dossier public.
app.use(express.static('public'));
// Permet de traiter les données soumis à un formulaire
app.use(express.urlencoded({extended : true}));
// Gère la session utilisateur
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
    // Dans un environnement de production, ici on doit définir une stratégie de stockage.
    //trouvable dans la doc express: expressjs.com/en/resources/middleware/session.html#compatible-session-stores.
}));
// Point de terminaison d'entrée pour toutes mes routes.
app.use('/', router);




// Lancement du serveur
app.listen(PORT, () => {
    console.log(`En attente de requêtes sur le port : ${PORT}`)
})