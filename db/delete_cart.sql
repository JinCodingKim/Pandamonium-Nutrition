DELETE FROM carts
WHERE product_id = $1;
SELECT * FROM carts
WHERE user_id = $2;