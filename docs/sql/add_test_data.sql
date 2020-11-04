
delete from test_definition_set;

delete from test_definition;

insert into test_definition_set(id)
values (1);

insert into test_definition_set(id, is_active)
values (2, true);

insert into test_definition_set(id, is_active, language)
values (3, false, 'german');

insert into test_definition_set(id, is_active, language)
values (4, true, 'german');

--
-- french
--

-- pre-test set

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




--
-- german
--

-- pre-test set

insert into test_definition (question, answer, setId)
values ('Farkas', 'Wolf', 3);
insert into test_definition (question, answer, setId)
values ('Cet', 'Wal', 3);
insert into test_definition (question, answer, setId)
values ('Menni', 'Laufen', 3);
insert into test_definition (question, answer, setId)
values ('Rohan', 'Rennen', 3);
insert into test_definition (question, answer, setId)
values ('Ugat', 'Bellen', 3);
insert into test_definition (question, answer, setId)
values ('Oldal', 'Seite', 3);
insert into test_definition (question, answer, setId)
values ('Toll', 'Stift', 3);
insert into test_definition (question, answer, setId)
values ('Tanulni', 'Lernen', 3);
insert into test_definition (question, answer, setId)
values ('Szem', 'Auge', 3);
insert into test_definition (question, answer, setId)
values ('Haj', 'Haare', 3);
insert into test_definition (question, answer, setId)
values ('Orr', 'Nase', 3);
insert into test_definition (question, answer, setId)
values ('Penz', 'Geld', 3);
insert into test_definition (question, answer, setId)
values ('Nyer', 'Gewinnen', 3);
insert into test_definition (question, answer, setId)
values ('Veszt', 'Verloren', 3);
insert into test_definition (question, answer, setId)
values ('Ember', 'Mann', 3);
insert into test_definition (question, answer, setId)
values ('Gyerek', 'Kind', 3);
insert into test_definition (question, answer, setId)
values ('Szoba', 'Zimmer', 3);
insert into test_definition (question, answer, setId)
values ('Asztal', 'Tisch', 3);
insert into test_definition (question, answer, setId)
values ('Konyha', 'Küche', 3);
insert into test_definition (question, answer, setId)
values ('Aludni', 'Schlafen', 3);


-- developer set (testing)

insert into test_definition (question, answer, setId)
values ('csirke', 'Poulet', 4);
insert into test_definition (question, answer, setId)
values ('sajt', 'Käse', 4);
insert into test_definition (question, answer, setId)
values ('bors', 'Pfeffer', 4);
insert into test_definition (question, answer, setId)
values ('fagyi', 'Eis', 4);
insert into test_definition (question, answer, setId)
values ('viz', 'Wasser', 4);


