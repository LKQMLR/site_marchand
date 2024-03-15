import query from '../../database.js';
import xss from 'xss';

export const updateInfosUser = (req, res) => {
    
    const id = req.params.id;

    query(`SELECT * FROM utilisateurs WHERE user_id = ?`,
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur serveur'});
        }
        res.render('user-update.ejs', {user : result[0]});
    })
}

export const submitInfosUserUpdated = (req, res) => {
    
    const id = req.params.id;

    query(`SELECT prenom, nom, email FROM utilisateurs WHERE user_id = ?`,
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur serveur'});
        }

        const updateUser = {
            id,
            name: req.body.name ? xss(req.body.name) : result[0].prenom,
            lastname: req.body.lastname ? xss(req.body.lastname) : result[0].nom,
            email: req.body.email ? xss(req.body.email) : result[0].email
        }

        query(`UPDATE utilisateurs
        SET prenom = ?,
            nom = ?,
            email = ? WHERE user_id = ?`,
        [updateUser.name, updateUser.lastname, updateUser.email, updateUser.id],
        (error, result) => {
            if(error){
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                return res.status(500).json({error : 'Erreur serveur'});
            }

            console.log(result)

            res.status(304).redirect(`/my-account/${id}`);
        })
    })

}