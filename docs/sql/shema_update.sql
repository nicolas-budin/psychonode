
--
-- contains schema updates
--

-- start command line
sqlite3 sample.db

-- see more
.changes on
.echo on

-- transaction management
BEGIN TRANSACTION;


-- release 1.1 : no schema change

-- release 1.2

ALTER TABLE user ADD COLUMN is_control boolean default false;


.schema user

-- release 1.3

ALTER TABLE user
    ADD COLUMN degree text;

ALTER TABLE user
    ADD COLUMN grade integer;

.schema user


-- COMMIT;
-- ROLLBACK;


.quit







