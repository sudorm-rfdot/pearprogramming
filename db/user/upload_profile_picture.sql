update users
set profile_picture = $1
where id = $2
returning profile_picture;