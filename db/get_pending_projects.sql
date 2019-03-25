select * from projects p
join users_projects_join up on p.id = up.project_id
where up.user_id = $1
and up.accepted = false;