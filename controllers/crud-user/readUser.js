import query from '../../database.js';

export const userAccount = (req, res) => {

    const id = req.params.id;
    console.log(`L'id DE REQ PARAMS : `, id)

    query(`SELECT * from utilisateurs WHERE user_id = ?`,
    [id],
    (error, result) => {
        if(error) {
            console.error(`Erreur lors de l'exécution de la requête : ${error}`);
            return res.status(500).json({ERROR : 'Erreur serveur'});
        }

        if(result.length === 0) {
            console.error(`ERREUR : l'id : ${id} n'est pas reconnu`);
            return res.status(500).json({ERROR: `L'id : ${id} n'est pas reconnu`});
        }

        res.render('user-account.ejs', {user : result[0]});
    })
}