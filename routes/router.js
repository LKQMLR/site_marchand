import { Router } from "express";
import { pageAccueil } from "../controllers/accueil.js";


const router = Router();

// ROUTES
router.get('/', pageAccueil);


// Permet l'export de mon fichier router 
export default router