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

insert into ui_text_elements_cv(key)
values ('welcome');

-- text for a given text element (one entry per supported language)
create table ui_text_elements
(
    key      text,
    language text default 'french',
    value    text,
    FOREIGN KEY (language) REFERENCES language_cv (language),
    FOREIGN KEY (key) REFERENCES ui_text_elements_cv (key)
);

-- french
insert into ui_text_elements(key, language, value)
values ('welcome', 'french', 'Bienvenue !');

-- german
insert into ui_text_elements(key, language, value)
values ('welcome', 'german', 'Willkommen !');

--
-- user
--

CREATE TABLE user
(
    id        text PRIMARY KEY,
    password  text default '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q',
    setId     integer default 1,
    age       integer,
    sex       text,
    level     text,
    language  text    default 'french',
    is_admin  boolean default false,
    createdAt date    DEFAULT (datetime('now', 'localtime')),
    updatedAt date,
    FOREIGN KEY (language) REFERENCES language_cv (language)
);

insert into user (id, is_admin, password)
values ('nb', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');
insert into user (id, is_admin, password)
values ('etf', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');
insert into user (id, is_admin, password)
values ('fb', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');
insert into user (id, is_admin, password)
values ('admin', true, '$2b$08$ByH5GZ9TDf0Qnk7RWGXO2efhD5YiQqNt4vFOq.gGPrRsDbRxGJuSC');
insert into user (id, is_admin, password, language)
values ('mm', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q', 'german');
insert into user (id, is_admin, password)
values ('lv', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');
insert into user (id, is_admin, password)
values ('ej', false, '$2b$08$LY7duGKhwm79yvvzXAI26.1rGEd4HFl4sBIDhT3FvIV46aggP0E9q');


select *
from user;


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


insert into test_definition_set(id)
values (1);

insert into test_definition_set(id, is_active)
values (2, true);

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


-- pre-test set

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
insert into test_definition (question, answer)
values ('Farkas', 'Loup');
insert into test_definition (question, answer)
values ('Cet', 'Baleine');
insert into test_definition (question, answer)
values ('Menni', 'Marcher');
insert into test_definition (question, answer)
values ('Rohan', 'Courir');
insert into test_definition (question, answer)
values ('Ugat', 'Aboyer');
insert into test_definition (question, answer)
values ('Oldal', 'Page');
insert into test_definition (question, answer)
values ('Toll', 'Stylo');
insert into test_definition (question, answer)
values ('Tanulni', 'Apprendre');
insert into test_definition (question, answer)
values ('Szem', 'Oeil');
insert into test_definition (question, answer)
values ('Haj', 'Cheveux');
insert into test_definition (question, answer)
values ('Orr', 'Nez');
insert into test_definition (question, answer)
values ('Penz', 'Argent');
insert into test_definition (question, answer)
values ('Nyer', 'Gagner');
insert into test_definition (question, answer)
values ('Veszt', 'Perdre');
insert into test_definition (question, answer)
values ('Ember', 'Homme');
insert into test_definition (question, answer)
values ('Gyerek', 'Enfant');
insert into test_definition (question, answer)
values ('Szoba', 'Chambre');
insert into test_definition (question, answer)
values ('Asztal', 'Table');
insert into test_definition (question, answer)
values ('Konyha', 'Cuisine');
insert into test_definition (question, answer)
values ('Aludni', 'Dormir');


-- developer set (testing)

insert into test_definition (question, answer, setId)
values ('csirke', 'poulet', 2);
insert into test_definition (question, answer, setId)
values ('sajt', 'fromage', 2);
insert into test_definition (question, answer, setId)
values ('bors', 'poivre', 2);
insert into test_definition (question, answer, setId)
values ('fagyi', 'glace', 2);
insert into test_definition (question, answer, setId)
values ('viz', 'eau', 2);


select *
from test_definition;

--
-- test
--

-- a test

create table test
(
    id            integer PRIMARY KEY,
    children_id   integer,
    user_id       text not null,
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

