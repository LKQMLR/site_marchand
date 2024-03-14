import query from '../database.js';
import bcrypt from 'bcrypt';

export const pageLogin = (req, res) => {
    res.render('login.ejs');
}

export const submitLogin = (req, res) => {
    
    // Récupère les champs email et password des input soumis par l'utilisateur
    const {email, password} = req.body;
    // Variable pour gèrer les erreurs de l'utilisateur
    const errorMessage = 'Identifiants incorrects'

    query('SELECT * FROM utilisateurs WHERE email = ?',
    [email],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur serveur'});
        }

        if(result.length === 0) {
            console.log(`Cet email n'existe pas dans la base de données : ${email}`);
            return res.render('login.ejs', {errorMessage});
        }

        bcrypt.compare(password, result[0].mot_de_passe, (error, isAllowed) => {
            if(error) {
                console.error(`Erreur lors du décriptage du mot de passe : ${error}`);
                return res.status(500).json({error : 'Erreur serveur'});
            }

            if(isAllowed) {
                req.session.isLogged = true;
                req.session.userID = result[0].user_id;
                req.session.name = result[0].name;
                req.session.role = result[0].role;

                console.log(`Utilisateur connecté`, result[0].user_id);

                res.status(304).redirect(`/`);
            } else {
                console.log('Mot de passe incorrect')
                return res.render('login.ejs', {errorMessage});
            }
        })
    })

}