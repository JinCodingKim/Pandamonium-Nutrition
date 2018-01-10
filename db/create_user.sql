INSERT INTO users (
    user_name,
    user_email,
    user_age,
    user_img,
    auth_id
    ) 
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
    )
RETURNING *;