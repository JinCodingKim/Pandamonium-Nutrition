INSERT INTO exercises (user_id, name, category, description)
VALUES ($1, $2, $3, $4)
RETURNING *;