module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');
        db.get_user([req.params.id]).then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getUsers: (req, res, next) => {
        const db = req.app.get('db');
        db.get_users().then(users => {
            res.status(200).json(users)
        }).catch(err => {
            res.status(500).json(err)
        })
    }
}