delete from users_projects_join
where user_id = $1;

delete from users
where id = $1;