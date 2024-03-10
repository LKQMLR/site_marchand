import { Router } from "express";
import { pageAccueil } from "../controllers/accueil.js";
import { pageLogin } from "../controllers/login.js";
import { pageInscription, submitInscription } from "../controllers/crud-user/createUser.js";


const router = Router();

router.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    res.locals.name = req.session.name;
    next();
})

// ROUTES

// accueil
router.get('/', pageAccueil);
// inscription
router.get('/inscription', pageInscription);
router.post('/inscription', submitInscription);
// login
router.get('/login', pageLogin);


// Permet l'export de mon fichier router 
export default router