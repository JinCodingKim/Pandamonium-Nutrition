UPDATE users
SET user_email = $2
WHERE user_id = $1;