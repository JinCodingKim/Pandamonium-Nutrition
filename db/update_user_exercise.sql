UPDATE exercises 
SET name = $3,
description = $4
WHERE user_id = $1
AND exercise_id = $2;