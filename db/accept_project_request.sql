update users_projects_join
set accepted = true
where user_id = ${userid}
and project_id = ${projectid};