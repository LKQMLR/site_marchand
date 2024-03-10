import query from '../../database.js';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import xss from 'xss';

export const pageInscription = (req, res) => {
    res.render('form-inscription.ejs');
}

export const submitInscription = (req, res) => {
    // Je récupère l'email provenant de l'input portant l'attribut name : email
    const email = xss(req.body.email);
    // Je récupère le mdp provenant de l'input portant l'attribut name : password
    const password = xss(req.body.password);
    // Tour de hash du mot de passe
    const salt = 10;
    // Requête SQL disant : Selectionne l'user_id de l'utilisateur ayant l'email que donne l'utilisateur
    query('SELECT user_id FROM utilisateurs WHERE email = ?',
    [email],
    (error, result) => {
        // Gestion d'erreur de la requête SQL
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({errorMessage : 'Erreur serveur'});
        }
        // Si le resultat est plus grand que 0 alors l'email existe dans la base de données
        if(result.length > 0) {
            console.log('Email déjà utilisée');
            return res.json({message : 'Email déjà utilisé'});
        }
        // Hachage du mot de passe de l'utilisateur
        bcrypt.hash(password, salt, (error, hashed) => {
            if(error) {
                console.error('Erreur lors du hachage du mot de passe');
                return res.status(500).json({message : 'Erreur serveur'})
            }
            // Création du nouvel utilisateur
            const user = {
                id: v4(),
                name: xss(req.body.name),
                lastname: xss(req.body.lastname),
                email: email,
                password: hashed,
            }

            query(`INSERT INTO utilisateurs VALUES (?, ?, ?, ?, ?)`,
            [user.id, user.name, user.lastname, user.email, user.password],
            (error, result) => {
                if(error) {
                    console.error(`Erreur lors de l'ajout de l'utilisateur dans la base de données ${error}`);
                    return res.status(500).json({message: 'Erreur serveur'});
                }

                req.session.userID = user.id;
                req.session.name = user.name;

                res.status(301).redirect('/');

                if(result) {
                    console.log('Nouvel utilisateur créé! : ', user);
                }
            })
        })
    })
}