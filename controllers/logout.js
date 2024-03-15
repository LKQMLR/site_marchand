export const submitLogout = (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.error(`Erreur déconnexion ${error}`);
            return res.status(500).json({errorMessage : 'Erreur serveur'});
        }
        res.status(302).redirect('/');
    })
}