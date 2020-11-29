
delete from test_definition;

delete from test_definition_set;



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
values ('Menni', 'Marcher');
insert into test_definition (question, answer)
values ('Oldal', 'Page');
insert into test_definition (question, answer)
values ('Toll', 'Stylo');
insert into test_definition (question, answer)
values ('Tanulni', 'Apprendre');
insert into test_definition (question, answer)
values ('Szem', 'Oeil');
insert into test_definition (question, answer)
values ('Szoba', 'Chambre');
insert into test_definition (question, answer)
values ('Asztal', 'Table');
insert into test_definition (question, answer)
values ('Tesz', 'Mettre');
insert into test_definition (question, answer)
values ('Aludni', 'Dormir');
insert into test_definition (question, answer)
values ('Sajt', 'Fromage');
insert into test_definition (question, answer)
values ('Bors', 'Poivre');
insert into test_definition (question, answer)
values ('Fagyi', 'Glace');
insert into test_definition (question, answer)
values ('Vezet', 'Conduire');
insert into test_definition (question, answer)
values ('Jegy', 'Billet');
insert into test_definition (question, answer)
values ('Vonat', 'Train');
insert into test_definition (question, answer)
values ('Ing', 'Chemise');
insert into test_definition (question, answer)
values ('Nyom', 'Pousser');
insert into test_definition (question, answer)
values ('Nagy', 'Gros');
insert into test_definition (question, answer)
values ('Hold', 'Lune');
insert into test_definition (question, answer)
values ('Bolt', 'Magasin');


-- developer set (testing)

insert into test_definition (question, answer, setId)
values ('Sajt', 'Fromage', 2);
insert into test_definition (question, answer, setId)
values ('Bors', 'Poivre', 2);
insert into test_definition (question, answer, setId)
values ('Farkas', 'Loup', 2);
insert into test_definition (question, answer, setId)
values ('Oldal', 'Page', 2);
insert into test_definition (question, answer, setId)
values ('Hold', 'Lune', 2);


--
-- german
--

-- pre-test set



insert into test_definition (question, answer, setId)
values ('Farkas', 'Wolf', 3);
insert into test_definition (question, answer, setId)
values ('Menni', 'laufen', 3);
insert into test_definition (question, answer, setId)
values ('Oldal', 'Seite', 3);
insert into test_definition (question, answer, setId)
values ('Toll', 'Stift', 3);
insert into test_definition (question, answer, setId)
values ('Tanulni', 'lernen', 3);
insert into test_definition (question, answer, setId)
values ('Szem', 'Auge', 3);
insert into test_definition (question, answer, setId)
values ('Szoba', 'Zimmer', 3);
insert into test_definition (question, answer, setId)
values ('Asztal', 'Tisch', 3);
insert into test_definition (question, answer, setId)
values ('Tesz', 'stellen', 3);
insert into test_definition (question, answer, setId)
values ('Aludni', 'schlafen', 3);
insert into test_definition (question, answer, setId)
values ('Sajt', 'Käse', 3);
insert into test_definition (question, answer, setId)
values ('Bors', 'Pfeffer', 3);
insert into test_definition (question, answer, setId)
values ('Fagyi', 'Eis', 3);
insert into test_definition (question, answer, setId)
values ('Vezet', 'fahren', 3);
insert into test_definition (question, answer, setId)
values ('Jegy', 'Ticket', 3);
insert into test_definition (question, answer, setId)
values ('Vonat', 'Zug', 3);
insert into test_definition (question, answer, setId)
values ('Ing', 'Hemd', 3);
insert into test_definition (question, answer, setId)
values ('Nyom', 'drücken', 3);
insert into test_definition (question, answer, setId)
values ('Nagy', 'dick', 3);
insert into test_definition (question, answer, setId)
values ('Hold', 'Mond', 3);
insert into test_definition (question, answer, setId)
values ('Bolt', 'Laden', 3);



-- developer set (testing)

insert into test_definition (question, answer, setId)
values ('Sajt', 'Käse', 4);
insert into test_definition (question, answer, setId)
values ('Bors', 'Pfeffer', 4);
insert into test_definition (question, answer, setId)
values ('Farkas', 'Wolf', 4);
insert into test_definition (question, answer, setId)
values ('Oldal', 'Seite', 4);
insert into test_definition (question, answer, setId)
values ('Hold', 'Mond', 4);


