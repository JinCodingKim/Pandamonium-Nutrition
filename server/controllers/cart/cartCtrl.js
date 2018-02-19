module.exports = {
  addCart: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { product_id, quantity, total_price, single_price } = req.body;
    db
      .add_cart([user_id, product_id, quantity, total_price, single_price])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateCart: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { product_id, quantity, total_price } = req.body;
    db
      .update_cart([user_id, product_id, quantity, total_price])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateCartItem: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { product_id, quantity, total_price } = req.body;
    db
      .update_cart_item([user_id, product_id, quantity, total_price])
      .then(item => res.status(200).json(item))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  deleteCart: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;
    const { user_id } = req.user;
    db
      .delete_cart([product_id, user_id])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getCart: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db
      .view_cart([user_id])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  removeAllCart: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db
      .delete_all_cart([user_id])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
