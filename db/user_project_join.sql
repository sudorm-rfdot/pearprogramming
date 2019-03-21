insert into users_projects_join (
    user_id,
    project_id,
    accepted
) values (
    $1,
    $2,
    $3
);