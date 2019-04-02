select * from files
where project_id = $1
order by file_name asc;