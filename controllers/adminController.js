import query from '../database.js';

export const listAdmin = (req, res) => {

    const id = req.params.id;

    query('SELECT * FROM utilisateurs WHERE user_id = ?',
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur Serveur'});
        }

        const admin = {
            id,
            name: result[0].prenom,
            lastname: result[0].nom,
            email: result[0].email,
            role: result[0].role 
        }

        res.json(result)
    })
}