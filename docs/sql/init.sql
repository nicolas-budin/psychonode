

-- user

drop table user;

CREATE TABLE user (
                      id text PRIMARY KEY,
                      age integer ,
                      sex text ,
                      level  text
);

insert into user (id, age, sex, level) values ('nb', 8, 'M','8');
insert into user (id) values ('nc');
insert into user (id) values ('nd');

select * from user;

-- test definition

drop table test_definition;

create table test_definition
(
    id integer PRIMARY KEY,
    test_id  integer not null,
    question text    not null,
    answer   text    not null
);

insert into test_definition (id, test_id, question, answer) values (1,1,'poulet', 'chicken');
insert into test_definition (id, test_id, question, answer) values (2,1,'voiture', 'car');
insert into test_definition (id, test_id, question, answer) values (3,1,'avion', 'plane');


select * from test_definition;