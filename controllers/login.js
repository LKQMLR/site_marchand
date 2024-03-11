import query from '../database.js';
import bcrypt from 'bcrypt';

export const pageLogin = (req, res) => {
    res.render('login.ejs');
}

export const submitLogin = (req, res) => {
    
    // Récupère les champs email et password des input soumis par l'utilisateur
    const {email, password} = req.body;

    query('SELECT * FROM utilisateurs WHERE email = ?',
    [email],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({ErrorMessage : 'Erreur serveur'});
        }

        if(result.length === 0) {
            console.log(`Cet email n'existe pas dans la base de données : ${email}`);
            return res.status(500).json({ErrorMessage : 'Email introuvable'});
        }

        if(result.length > 0) {
            console.log(result);
        }
    })

}