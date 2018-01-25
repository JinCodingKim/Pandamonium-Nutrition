module.exports = {
  postSubscriptionEmail: (req, res, next) => {
    const db = req.app.get("db");
    const { subscription_email } = req.body;
    db
      .post_subscription_email([subscription_email])
      .then(email => {
        res.status(200).json(email);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
