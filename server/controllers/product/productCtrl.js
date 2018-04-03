module.exports = {
  getProductByType: (req, res) => {
    const db = req.app.get("db");
    const { product_type } = req.params;
    db
      .get_product_by_type([product_type])
      .then(product => res.status(200).json(product))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getDistinctProducts: (req, res) => {
    const db = req.app.get("db");
    const { sort } = req.query;
    if (sort === "ascend") {
      db
        .get_products_asc()
        .then(products => res.status(200).json(products))
        .catch(err => {
          res.status(500).json(err);
        });
    } else if (sort === "descend") {
      db
        .get_products_desc()
        .then(products => res.status(200).json(products))
        .catch(err => {
          res.status(500).json(err);
        });
    } else if (sort === "az") {
      db
        .get_products_az()
        .then(products => res.status(200).json(products))
        .catch(err => {
          res.status(500).json(err);
        });
    } else if (sort === "za") {
      db
        .get_products_za()
        .then(products => res.status(200).json(products))
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      db
        .get_distinct_product()
        .then(products => res.status(200).json(products))
        .catch(err => {
          res.status(500).json(err);
        });
    }
  }
};
