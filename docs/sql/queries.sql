-- finds out if there is an already started test
select *
from test
where user_id = 'nb'
  and is_aborted = false
  and is_completed = false
order by id desc;


-- finds available test element
select t.id, te.user_answer, td.question, td.answer
from test t,
     test_element te,
     test_definition td
where t.id = 1
  and te.test_definition_id = td.id
  and te.is_success = false
  and te.updatedAt is NULL
order by td.id asc;


-- finds available test element
select u.id, te.user_answer, td.question, td.answer
from user u,
     test t,
     test_element te,
     test_definition td
where u.id = 'nb'
  and t.user_id = u.id
  and te.test_id = t.id
  and te.test_definition_id = td.id
  and te.is_success = false
  and te.updatedAt is NULL
order by td.id asc;


-- gets available test_definitions
select *
from test_definition td
where td.id not in (select td.id
                    from test_definition td,
                         test t,
                         test_element te
                    where t.id = 1
                      and te.test_id = t.id
                      and te.test_definition_id = td.id
                    order by td.id asc
);


-- get test current iteration
select te.iteration
from test t,
     test_element te
where t.id = 1
  and te.test_id = t.id
order by te.iteration desc
limit 1;



-- failed elements
select distinct te.id
from test_definition td,
     test t,
     test_element te
where t.id = 1
  and te.test_id = t.id
  and te.test_definition_id = td.id
  and te.iteration = 0
  and te.is_done = false
  and te.is_success = true
order by td.id asc;


-- gets number of non tested elements in this iteration
select count(*)
from test t,
     test_element te
where t.id = 1
  and te.test_id = t.id
  and te.iteration = 0
  and te.is_done = false;



