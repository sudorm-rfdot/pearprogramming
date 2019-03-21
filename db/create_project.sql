insert into projects (
    project_name
) values (
    $1
)
returning *;