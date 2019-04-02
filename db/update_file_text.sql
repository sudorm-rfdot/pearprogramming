update files
set file_link = $1
where id = $2
returning *;