import query from '../database.js';

export const listAdmin = (req, res) => {

    query(`SELECT * FROM utilisateurs WHERE role = 'Admin'`,
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({error : 'Erreur Serveur'});
        }

        res.json(result)
    })
}