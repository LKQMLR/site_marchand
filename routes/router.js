import { Router } from "express";
import { pageAccueil } from "../controllers/accueil.js";
import { pageLogin } from "../controllers/login.js";
import { pageInscription } from "../controllers/crud-user/createUser.js";


const router = Router();

// ROUTES

// accueil
router.get('/', pageAccueil);
// inscription
router.get('/inscription', pageInscription)
// login
router.get('/login', pageLogin);


// Permet l'export de mon fichier router 
export default router