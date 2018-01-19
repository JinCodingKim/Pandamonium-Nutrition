SELECT carts.product_id, products.product_img, products.product_name, products.product_flavor, carts.total_price, carts.quantity, carts.single_price
FROM products
JOIN carts
ON products.product_id = carts.product_id
WHERE carts.user_id = $1;