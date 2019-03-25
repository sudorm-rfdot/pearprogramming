create table if not exists users (
    id serial primary key,
    email varchar(250) not null,
    username varchar(60) not null,
    password varchar(250) not null,
    profile_picture varchar(250)
);

create table if not exists projects (
    id serial primary key,
    project_name varchar(60) not null
);

create table if not exists files (
    id serial primary key,
    file_name varchar(250) not null,
    project_id int references projects(id)
);

create table if not exists users_projects_join (
    id serial primary key,
    user_id int references users(id),
    project_id int references projects(id),
    accepted boolean
);

alter table users
alter column username type varchar(250);

ALTER TABLE users 
ADD CONSTRAINT unique_email 
UNIQUE (email);