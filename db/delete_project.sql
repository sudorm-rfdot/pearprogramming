delete from users_projects_join
where project_id = $1;

delete from files
where project_id = $1;

delete from projects
where id = $1;