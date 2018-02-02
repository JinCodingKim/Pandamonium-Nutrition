DELETE FROM exercises
WHERE exercise_id = $2
AND user_id = $1;