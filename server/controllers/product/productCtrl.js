module.exports = {
  // getProducts: (req, res, next) => {
  //   const db = req.app.get("db");
  //   db
  //     .get_products()
  //     .then(products => res.status(200).json(products))
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // },
  getProductByType: (req, res, next) => {
    const db = req.app.get("db");
    const { product_type } = req.params;
    db
      .get_product_by_type([product_type])
      .then(product => res.status(200).json(product))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getDistinctProducts: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_distinct_product()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
