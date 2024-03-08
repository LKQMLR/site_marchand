import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();


// création d'un pool de connexion pour la gestion des requêtes vers la base de données
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

})

// fonction d'ordre supérieur pour se connecter à la base de données (pool.getConnection) et pour executer la requête SQL (connection.query)
export default(queryString, params, callback) => {
    pool.getConnection((error, connection) => {
        if(error) {
            console.error(`Erreur: Impossible de se connecter à la base de données`);
            callback(error);
            return;
        } else {
            console.log(`Connexion à la base de données établie...`);

            connection.query(queryString, params, (error, result) => {
                connection.release();
                callback(error, result);
            });
        }
    })
}