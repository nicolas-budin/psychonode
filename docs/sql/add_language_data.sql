
--
--      must be run AFTER init.sql
--

--
-- definitions
--

insert into ui_text_elements_cv(key)
values ('welcome');

insert into ui_text_elements_cv(key)
values ('enter_login');

insert into ui_text_elements_cv(key)
values ('enter_password');

insert into ui_text_elements_cv(key)
values ('press_key_to_continue');

insert into ui_text_elements_cv(key)
values ('fill_form');

insert into ui_text_elements_cv(key)
values ('age');

insert into ui_text_elements_cv(key)
values ('age_constraints');

insert into ui_text_elements_cv(key)
values ('sex');

insert into ui_text_elements_cv(key)
values ('male');

insert into ui_text_elements_cv(key)
values ('female');

insert into ui_text_elements_cv(key)
values ('level');


insert into ui_text_elements_cv(key)
values ('explanation');

insert into ui_text_elements_cv(key)
values ('example');

insert into ui_text_elements_cv(key)
values ('source_language');

insert into ui_text_elements_cv(key)
values ('target_language');


--
-- french
--

-- login

insert into ui_text_elements(key, language, value)
values ('welcome', 'french', 'Bienvenue !');

insert into ui_text_elements(key, language, value)
values ('enter_login', 'french', 'Remplis ton numéro d''identification');

insert into ui_text_elements(key, language, value)
values ('enter_password', 'french', 'Remplis ton mot de passe');


-- form

insert into ui_text_elements(key, language, value)
values ('fill_form', 'french', 'Avant de commencer, tu vas remplir ce formulaire');

insert into ui_text_elements(key, language, value)
values ('age', 'french', 'Ton âge');

insert into ui_text_elements(key, language, value)
values ('age_constraints', 'french', 'Tu dois entrer un age entre 10 et 20 ans :)');

insert into ui_text_elements(key, language, value)
values ('sex', 'french', 'Ton sexe');

insert into ui_text_elements(key, language, value)
values ('male', 'french', 'Garcon');

insert into ui_text_elements(key, language, value)
values ('female', 'french', 'Fille');

insert into ui_text_elements(key, language, value)
values ('level', 'french', 'Ton degré scolaire');

-- explanation

insert into ui_text_elements(key, language, value)
values ('explanation', 'french', 'Dans cet exercice, tu vas apprendre des mots en Hongrois !');

insert into ui_text_elements(key, language, value)
values ('example', 'french', 'Essaye de retenir cet exemple');

insert into ui_text_elements(key, language, value)
values ('source_language', 'french', 'Hongrois');

insert into ui_text_elements(key, language, value)
values ('target_language', 'french', 'Francais');

-- misc

insert into ui_text_elements(key, language, value)
values ('press_key_to_continue', 'french', 'Appuie sur une touche pour continuer');

--
-- german
--

-- login page

insert into ui_text_elements(key, language, value)
values ('welcome', 'german', 'Willkommen !');

insert into ui_text_elements(key, language, value)
values ('enter_login', 'german', 'Bitte gib deine Schülernummer ein');

insert into ui_text_elements(key, language, value)
values ('enter_password', 'german', 'Bitte gib dein Passwort ein');

-- user form

insert into ui_text_elements(key, language, value)
values ('fill_form', 'german', 'Bevor du beginnst, bitte gib diese Informationen ein');

insert into ui_text_elements(key, language, value)
values ('age', 'german', 'Dein Alter');

insert into ui_text_elements(key, language, value)
values ('age_constraints', 'german', 'Bitte gib ein Alter zwischen 10 und 20 ein :)');

insert into ui_text_elements(key, language, value)
values ('sex', 'german', 'Dein Geschlecht');

insert into ui_text_elements(key, language, value)
values ('male', 'german', 'Junge');

insert into ui_text_elements(key, language, value)
values ('female', 'german', 'Mädchen');

insert into ui_text_elements(key, language, value)
values ('level', 'german', 'Deine Schulklasse');


-- explanation

insert into ui_text_elements(key, language, value)
values ('explanation', 'german', 'In dieser Übung wirst du ein paar Wörter auf ungarisch lernen!');

insert into ui_text_elements(key, language, value)
values ('example', 'german', 'Probier mal dir dieses Beispiel zu merken:');

insert into ui_text_elements(key, language, value)
values ('source_language', 'german', 'Ungarisch');

insert into ui_text_elements(key, language, value)
values ('target_language', 'german', 'Deutsch');

-- misc

insert into ui_text_elements(key, language, value)
values ('press_key_to_continue', 'german', 'Eine Taste drücken, um weiterzumachen');


