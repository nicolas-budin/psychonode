

.changes on
.echo on

BEGIN TRANSACTION;

.schema test_definition_set
.schema test_definition

select count (*) from test_definition_set;
select count (*) from test_definition;

-- update to correct path
.read docs/sql/add_test_data_15;

select count (*) from test_definition_set;
select count (*) from test_definition;

select * from test_definition_set;
select count (*) from test_definition where setId = 5;
select * from test_definition where setId = 5;


-- COMMIT;
-- ROLLBACK;


.quit