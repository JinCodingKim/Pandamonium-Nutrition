UPDATE exercises 
SET name = $3,
category = $4,
description = $5
WHERE user_id = $1
AND axios_id = $2
RETURNING *;