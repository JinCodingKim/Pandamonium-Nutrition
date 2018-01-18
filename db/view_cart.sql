SELECT carts.product_id, products.product_name, products.product_flavor, products.product_price, carts.quantity
FROM products
JOIN carts
ON products.product_id = carts.product_id
WHERE carts.user_id = $1;