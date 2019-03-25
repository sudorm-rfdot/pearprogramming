update users
set(username) = ($1)
where id = $2
returning username;