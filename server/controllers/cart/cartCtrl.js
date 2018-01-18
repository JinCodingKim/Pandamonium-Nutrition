module.exports = {
  addCart: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;
    db
      .add_cart([user_id, product_id, quantity])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateCart: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;
    db
      .update_cart([user_id, product_id, quantity])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getCart: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db
      .view_cart([user_id])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
