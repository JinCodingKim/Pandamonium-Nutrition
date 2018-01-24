module.exports = {
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
  },
  getProductsAsc: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products_asc()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getProductsDesc: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products_desc()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getProductsAToZ: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products_az()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getProductsZToA: (req, res, next) => {
    const db = req.app.get("db");
    db
      .get_products_za()
      .then(products => res.status(200).json(products))
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
