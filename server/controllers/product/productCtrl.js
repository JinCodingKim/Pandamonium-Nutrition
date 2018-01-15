module.exports = {
  getProducts: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
