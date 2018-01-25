UPDATE users 
SET shipping_first_name = $2, 
shipping_last_name = $3, 
shipping_address = $4, 
shipping_city = $5, 
shipping_state = $6, 
shipping_country = $7, 
shipping_zip = $8
WHERE user_id = $1;