module.exports = {
  getUserByUserId: (req, res) => {
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
  userInfo: (req, res) => {
    const db = req.app.get("db");
    const { auth_id } = req.user;
    const { name, age, img } = req.body;
    db
      .user_info([name, age, img, auth_id])
      .then(user => {
        req.session.passport.user.user_name = name;
        req.session.passport.user.user_age = age;
        req.session.passport.user.user_img = img;
        req.session.save(function(err) {});
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateGuestEmail: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { user_email } = req.body;
    db
      .update_guest_email([user_id, user_email])
      .then(() => {
        // req.session.passport.user.user_email = user_email;
        req.session.save(function(err) {});
        res.status(200).json();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateShippingAddress: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const {
      shipping_first_name,
      shipping_last_name,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_country,
      shipping_zip
    } = req.body;
    db
      .update_shipping_address([
        user_id,
        shipping_first_name,
        shipping_last_name,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_country,
        shipping_zip
      ])
      .then(() => {
        // req.session.passport.user.shipping_first_name = shipping_first_name;
        // req.session.passport.user.shipping_last_name = shipping_last_name;
        // req.session.passport.user.shipping_address = shipping_address;
        // req.session.passport.user.shipping_city = shipping_city;
        // req.session.passport.user.shipping_state = shipping_state;
        // req.session.passport.user.shipping_country = shipping_country;
        // req.session.passport.user.shipping_zip = shipping_zip;
        req.session.save(function(err) {});
        res.status(200).json();
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateBillingAddress: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const {
      billing_first_name,
      billing_last_name,
      billing_address,
      billing_city,
      billing_state,
      billing_country,
      billing_zip
    } = req.body;
    db
      .update_billing_address([
        user_id,
        billing_first_name,
        billing_last_name,
        billing_address,
        billing_city,
        billing_state,
        billing_country,
        billing_zip
      ])
      .then(() => {
        // req.session.passport.user.billing_first_name = billing_first_name;
        // req.session.passport.user.billing_last_name = billing_last_name;
        // req.session.passport.user.billing_address = billing_address;
        // req.session.passport.user.billing_city = billing_city;
        // req.session.passport.user.billing_state = billing_state;
        // req.session.passport.user.billing_country = billing_country;
        // req.session.passport.user.billing_zip = billing_zip;
        req.session.save(function(err) {});
        res.status(200).json();
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
