create table rate (
id serial PRIMARY KEY,
quote text not null,
rating int not null,
ip text not null
)