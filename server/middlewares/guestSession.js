module.exports = (req, res, next) => {
  if (!req.user) {
    req.user = {
      user_id: 1,
      cart: [],
      total: 0,
      user_email: "",
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_country: "",
      shipping_zip: 0,
      billing_first_name: "",
      billing_last_name: "",
      billing_address: "",
      billing_city: "",
      billing_state: "",
      billing_country: "",
      billing_zip: 0,
      auth_id: "auth0|guest"
    };
  }
  next();
};
