module.exports = {
  getUserByUserId: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    db
      .get_user_by_user_id([user_id])
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  userInfo: (req, res, next) => {
    const db = req.app.get("db");
    // console.log(req.user);
    const { auth_id } = req.user;
    const { name, age, img } = req.body;
    db
      .user_info([name, age, img, auth_id])
      .then(user => {
        req.session.passport.user.user_name = name;
        req.session.passport.user.user_age = age;
        req.session.passport.user.user_img = img;
        req.session.save(function(err) {
          console.log(err);
        });
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateGuestEmail: (req, res, next) => {
    console.log(req.user);
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { user_email } = req.body;
    db
      .update_guest_email([user_id, user_email])
      .then(guest => {
        req.session.passport.user.user_email = user_email;
        req.session.save(function(err) {
          console.log(err);
        });
        res.status(200).json(guest);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
