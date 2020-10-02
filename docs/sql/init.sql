-- enables foreign keys
PRAGMA foreign_keys = ON;
PRAGMA foreign_keys;

-- clean tables
drop table if exists test_element;
drop table if exists test;
drop table if exists test_definition;
drop table if exists user;

-- user
CREATE TABLE user
(
    id        text PRIMARY KEY,
    age       integer,
    sex       text,
    level     text,
    createdAt date DEFAULT (datetime('now', 'localtime')),
    updatedAt date
);

insert into user (id, age, sex, level)
values ('nb', 8, 'M', '8');
insert into user (id)
values ('etf');


select *
from user;

-- test definition
create table test_definition
(
    id        integer PRIMARY KEY,
    question  text not null,
    answer    text not null,
    createdAt date DEFAULT (datetime('now', 'localtime')),
    updatedAt date
);

insert into test_definition (question, answer)
values ('csirke', 'poulet');
insert into test_definition (question, answer)
values ('sajt', 'fromage');
insert into test_definition (question, answer)
values ('bors', 'poivre');
insert into test_definition (question, answer)
values ('fagyi', 'glace');
insert into test_definition (question, answer)
values ('viz', 'eau');

select *
from test_definition;

-- test
create table test
(
    id            integer PRIMARY KEY,
    children_id   integer,
    user_id       text not null,
    is_first_step boolean default true,
    is_completed  boolean default false,
    is_aborted  boolean default false,
    createdAt     date    DEFAULT (datetime('now', 'localtime')),
    updatedAt     date,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (children_id) REFERENCES test (id)
);

-- test element
create table test_element
(
    id                 integer PRIMARY KEY,
    test_id            integer not null,
    test_definition_id integer not null,
    iteration          integer default 0,
    is_success         boolean default false,
    is_redo            boolean default false,
    is_done            boolean default false,
    is_redisplay       boolean default false,
    usage_counter      integer default 0,
    user_answer        text,
    createdAt          date    DEFAULT (datetime('now', 'localtime')),
    updatedAt          date,
    FOREIGN KEY (test_id) REFERENCES test (id),
    FOREIGN KEY (test_definition_id) REFERENCES test_definition (id)
);

