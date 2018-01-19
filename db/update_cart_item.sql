UPDATE carts 
SET quantity = $3,
total_price = $4
WHERE user_id = $1
AND product_id = $2;
-- SELECT * FROM carts WHERE user_id = $1;