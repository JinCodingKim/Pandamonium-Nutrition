module.exports = {
  getProducts: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getProductById: (req, res, next) => {
    const db = req.app.get("db");
    const { product_id } = req.params;
    db
      .get_product_by_id([product_id])
      .then(product => res.status(200).json(product))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
