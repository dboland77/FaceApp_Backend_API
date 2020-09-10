CREATE DATABASE faceapplogin

CREATE TABLE login (
  id serial PRIMARY KEY,
  hash varchar(100) NOT NULL,
  email text UNIQUE NOT NULL,
  entries int
);
