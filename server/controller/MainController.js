module.exports = {
    getUserProjects: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_projects(id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    }
}