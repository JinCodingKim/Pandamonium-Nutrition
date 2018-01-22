SELECT * FROM (
  SELECT DISTINCT ON (product_type) *
  FROM products
  ) products
  ORDER BY product_name ASC