const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        let user = await db.user.check_user({email});
        user = user[0];
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register({email, password: hash, username: email});
        newUser = newUser[0];
        session.user = newUser;
        delete newUser.password;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        let user = await db.user.check_user({email});
        user = user[0];
        if(!user){
            return res.status(400).send('User not found')
        }
        const foundUser = bcrypt.compareSync(password, user.password);
        if(foundUser){
            delete user.password;
            session.user = user;
            res.send(session.user);
        } else {
            res.status(401).send('Incorrect Password');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
};