module.exports = {
  getUsers: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_users()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  userInfo: (req, res, next) => {
    const db = req.app.get("db");
    console.log(req.user);
    const { auth_id } = req.user;
    const { name, age, img } = req.body;
    db.user_info([name, age, img, auth_id]).then(user => {
      req.session.passport.user.user_name = name;
      req.session.passport.user.user_age = age;
      req.session.passport.user.user_img = img;
      req.session.save(function(err) {
        console.log(err);
      });
      res.status(200).json(user);
    });
  }
};
