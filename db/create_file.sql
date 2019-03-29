insert into files (
    file_name,
    project_id
) values (
    $1,
    $2
)
returning *;