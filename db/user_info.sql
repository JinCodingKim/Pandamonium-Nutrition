UPDATE users SET 
    user_name = $1,
    user_age =$2, 
    user_img = $3
WHERE auth_id = $4
RETURNING *;