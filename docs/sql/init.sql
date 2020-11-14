-- enables foreign keys
PRAGMA foreign_keys = ON;
PRAGMA foreign_keys;

-- clean tables
drop table if exists test_element;
drop table if exists test;
drop table if exists test_definition;
drop table if exists test_definition_set;
drop table if exists user;

drop table if exists ui_text_elements;
drop table if exists ui_text_elements_cv;
drop table if exists language_cv;

--
-- support for multi language
--

-- language
create table language_cv
(
    language text PRIMARY KEY
);

insert into language_cv(language)
values ('french');
insert into language_cv(language)
values ('german');
insert into language_cv(language)
values ('english');

-- text elements
create table ui_text_elements_cv
(
    key         text PRIMARY KEY,
    description text default ''
);



-- text for a given text element (one entry per supported language)
create table ui_text_elements
(
    key      text,
    language text default 'french',
    value    text,
    FOREIGN KEY (language) REFERENCES language_cv (language),
    FOREIGN KEY (key) REFERENCES ui_text_elements_cv (key),
    unique(key, language)
);


--
-- user
--

CREATE TABLE user
(
    id        integer PRIMARY KEY,
    login     text not null UNIQUE,
    password  text default '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q',
    setId     integer default 1,
    age       integer,
    sex       text,
    level     text,
    parent    integer,
    language  text    default 'french',
    is_admin  boolean default false,
    is_active  boolean default true,
    createdAt date    DEFAULT (datetime('now', 'localtime')),
    updatedAt date,
    FOREIGN KEY (language) REFERENCES language_cv (language),
    FOREIGN KEY (parent) REFERENCES user (id)
);

insert into user (id, login, is_admin, password)
values (1, 'admin', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC');

insert into user (id, login, is_admin, parent, password)
values (2, 'nb', false, 1, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');
insert into user (id, login, is_admin, parent, password)
values (3, 'etf', false, 1, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');

insert into user (id, login, is_admin, password)
values (4, 'fb', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC');
insert into user (id, login, is_admin, password, language)
values (5, 'mm', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC', 'german');
insert into user (id, login, is_admin, password)
values (6, 'lv', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC');
insert into user (id, login, is_admin, password)
values (7, 'ej', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC');

insert into user (id, login, is_admin, password, language)
values (0, 'admin_german', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC', 'german');

--
-- test definitions
--

-- a group of test definition
create table test_definition_set
(
    id          integer PRIMARY KEY,
    description text,
    is_active   boolean default false,
    language    text default 'french',
    createdAt   date DEFAULT (datetime('now', 'localtime')),
    updatedAt   date,
    FOREIGN KEY (language) REFERENCES language_cv (language)
);


-- test definition
create table test_definition
(
    id        integer PRIMARY KEY,
    setId     integer default 1,
    question  text not null,
    answer    text not null,
    createdAt date    DEFAULT (datetime('now', 'localtime')),
    updatedAt date,
    FOREIGN KEY (setId) REFERENCES test_definition_set (id)
);


--
-- test
--

-- a test

create table test
(
    id            integer PRIMARY KEY,
    children_id   integer,
    user_id       integer not null,
    setId         integer default 1,
    is_first_step boolean default true,
    is_completed  boolean default false,
    is_aborted    boolean default false,
    createdAt     date    DEFAULT (datetime('now', 'localtime')),
    updatedAt     date,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (children_id) REFERENCES test (id),
    FOREIGN KEY (setId) REFERENCES test_definition_set (id)
);

-- a test element

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
    is_a_repeat        boolean default false,
    usage_counter      integer default 0,
    question           text,
    answer             text,
    user_answer        text,
    createdAt          date    DEFAULT (datetime('now', 'localtime')),
    updatedAt          date,
    FOREIGN KEY (test_id) REFERENCES test (id),
    FOREIGN KEY (test_definition_id) REFERENCES test_definition (id)
);

