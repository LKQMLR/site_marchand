import { Router } from "express";
import { pageAccueil } from "../controllers/accueil.js";
import { pageLogin, submitLogin } from "../controllers/login.js";
import { pageInscription, submitInscription } from "../controllers/crud-user/createUser.js";


const router = Router();

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    res.locals.role = req.session.role;
    res.locals.userID = req.session.userID;
    res.locals.name = req.session.name;
    next();
})

// Verification d'authentification utilisateurs
const checkAuthentication = (req, res, next) => {
    if(req.session.isLogged === true) {
        next();
    } else {
        res.status(304).redirect('/login');
    }
}

// Verification d'authentification administrateurs
const checkAdminAuthentication = (req, res, next) => {
    if(req.session.isLogged === true & req.session.role === 'admin') {
        next();
    } else {
        res.status(304).redirect('/login');
    }
}

// ROUTES

// accueil
router.get('/', pageAccueil);
// inscription
router.get('/inscription', pageInscription);
router.post('/inscription', submitInscription);
// login
router.get('/login', pageLogin);
router.post('/login', submitLogin);



// PAGE TEST
router.get('/test', checkAuthentication, (req, res) => {
    res.send('Page TEST')
})

// Permet l'export de mon fichier router 
export default router