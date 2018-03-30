INSERT INTO exercises (user_id, axios_id, name, category, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;