select * from projects p
join users_projects_join up at p.id = up.project_id
where up.user_id = $1;