-- enables foreign keys

PRAGMA foreign_keys = ON;
PRAGMA foreign_keys;

-- user

drop table user;

CREATE TABLE user
(
    id    text PRIMARY KEY,
    age   integer,
    sex   text,
    level text
);

insert into user (id, age, sex, level)
values ('nb', 8, 'M', '8');
insert into user (id)
values ('nc');
insert into user (id)
values ('nd');

select *
from user;

-- test definition

drop table test_definition;

create table test_definition
(
    id       integer PRIMARY KEY,
    question text not null,
    answer   text not null
);

insert into test_definition (id, question, answer)
values (1, 'poulet', 'chicken');
insert into test_definition (id, question, answer)
values (2, 'voiture', 'car');
insert into test_definition (id, question, answer)
values (3, 'avion', 'plane');


select *
from test_definition;

drop table test;

create table test
(
    id            integer PRIMARY KEY AUTOINCREMENT,
    user_id       integer not null,
    is_first_step boolean default true,
    is_completed  boolean default false,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

drop table test_element;

create table test_element
(
    id                 integer PRIMARY KEY AUTOINCREMENT,
    test_id            integer not null,
    test_definition_id integer not null,
    is_success         boolean default false,
    is_redo            boolean default false,
    is_redisplay       boolean default false,
    FOREIGN KEY (test_id) REFERENCES test (id),
    FOREIGN KEY (test_definition_id) REFERENCES test_definition (id)
);

