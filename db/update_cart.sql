UPDATE carts 
SET quantity = quantity + $3,
total_price = total_price + $4
WHERE user_id = $1
AND product_id = $2
RETURNING *;