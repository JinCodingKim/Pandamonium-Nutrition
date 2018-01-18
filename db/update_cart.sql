UPDATE carts 
SET quantity = quantity + $3
WHERE user_id = $1
AND product_id = $2;