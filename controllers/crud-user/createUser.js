import query from '../../database.js';
import { v4 } from 'uuid';

export const pageInscription = (req, res) => {
    res.render('form-inscription.ejs');
}

export const submitInscription = (req, res) => {
    const email = req.body.email;

    console.log(email);
}