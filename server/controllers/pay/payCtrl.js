module.exports = {
  postPayment: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { total_price } = req.body;
    db
      .post_payment([user_id, total_price])
      .then(order => res.status(200).json(order))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
