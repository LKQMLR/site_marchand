import query from '../../database.js';

export const submitDeleteUser = (req, res) => {
    const id = req.params.id;

    query(`DELETE FROM utilisateurs WHERE user_id = ?`,
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur serveur'});
        }

        req.session.isLogged = false;

        res.status(304).redirect('/');
    })
}