module.exports = (req, res, next) => {
  if (!req.user) {
    req.user = {
      user_id: 1,
      cart: [],
      total: 0,
      user_email: "",
      shipping_address: "",
      shipping_state: "",
      shipping_country: "",
      shipping_zip: 0,
      billing_address: "",
      billing_state: "",
      billing_country: "",
      billing_zip: 0,
      auth_id: "auth0|guest"
    };
  }
  next();
};
