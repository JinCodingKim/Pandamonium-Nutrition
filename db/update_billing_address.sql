UPDATE users 
SET billing_first_name = $2, 
billing_last_name = $3, 
billing_address = $4, 
billing_city = $5, 
billing_state = $6, 
billing_country = $7, 
billing_zip = $8
WHERE user_id = $1;