import query from '../database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';


export const checkPassword = (req, res) => {

    const id = req.params.id;
    const password = xss(req.body.password);
    

    query(`SELECT * FROM utilisateurs WHERE user_id = ?`,
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur serveur'});
        }

        const user = {
            id,
            name: result[0].prenom,
            lastname: result[0].nom,
            email: result[0].email,
            password: result[0].mot_de_passe,
            role: result[0].role,
        }

        bcrypt.compare(password, user.password, (error, isAllowed) => {
            if(error) {
                console.error(`Erreur lors de la comparaison du mot de passe : ${error}`);
                return res.status(500).json({error : 'Erreur serveur'});
            }

            if(isAllowed) {
                console.log('Bon mot de passe');
                res.status(304).redirect(`/my-account/update-infos-user/${id}`);
            }else {
                console.log('Mauvais mot de passe');
                console.log(user.name, user.lastname);
                res.render('user-account.ejs', {user, errorMessage : 'mot de passe incorrect'});
            }
        })
    })
}