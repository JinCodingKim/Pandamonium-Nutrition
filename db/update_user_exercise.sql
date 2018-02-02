UPDATE exercises 
SET name = $3,
category = $4,
description = $5
WHERE user_id = $1
AND exercise_id = $2
RETURNING *;