CREATE DATABASE company;
CREATE Table if not exists employees(
    id serial,
    nama varchar(50) not null,
    gender varchar(7) not null,
    departement varchar(50) not null,
    amout text,
    PRIMARY KEY (id)

);