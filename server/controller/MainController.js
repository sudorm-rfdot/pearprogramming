module.exports = {
    getUserProjects: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_projects(id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    deleteProject: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_project(id)
        .then(project => res.status(200).send(project))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getProjectFiles: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_project_files(id)
        .then(files => res.status(200).send(files))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getOneFile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_one_file(id)
        .then(file => res.status(200).send(file))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getUserProfile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_profile(id)
        .then(profile => res.status(200).send(profile))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    updateUserProfile: (req, res) => {
        const {email, username, password} = req.body;
        const {id} = req.params;
        req.app.get('db').update_profile([email, username, password, id])
        .then(profile => res.status(200).send(profile))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    deleteUserProfile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_profile(id)
        .then(res.sendStatus(200))
    }
}