update users
set(email, username, password) = ($1, $2, $3)
where id = $4;