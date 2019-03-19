insert into users (
    email,
    password,
    username
) values (
    ${email},
    ${password},
    ${username}
)
returning *;