CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash VARCHAR
);

CREATE TYPE date_tag AS ENUM('day', 'week', 'year');

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  user_id int,
  date date,
  description varchar(200),
  tag date_tag,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  user_id int,
  date date,
  time time,
  tag date_tag,
  name varchar,
  description varchar,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE entries(
  entry_id SERIAL PRIMARY KEY,
  user_id int,
  date date,
  entry varchar,
  tag date_tag,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE habits (
  habits_id SERIAL PRIMARY KEY,
  user_id int,
  name varchar(200),
  date date,
  is_checked boolean,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);
