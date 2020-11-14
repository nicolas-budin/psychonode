
--
--      must be run AFTER init.sql
--

delete from ui_text_elements;

delete from ui_text_elements_cv;



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


insert into ui_text_elements_cv(key)
values ('try_to_translate');

insert into ui_text_elements_cv(key)
values ('write_answer');

insert into ui_text_elements_cv(key)
values ('wrong_answer');

insert into ui_text_elements_cv(key)
values ('question');

insert into ui_text_elements_cv(key)
values ('answer');

insert into ui_text_elements_cv(key)
values ('press_key_to_try_again');

insert into ui_text_elements_cv(key)
values ('right_answer');

insert into ui_text_elements_cv(key)
values ('test_intro_1');

insert into ui_text_elements_cv(key)
values ('test_intro_2');

insert into ui_text_elements_cv(key)
values ('test_intro_3');

insert into ui_text_elements_cv(key)
values ('press_key_to_start');

insert into ui_text_elements_cv(key)
values ('try_to_remember');

insert into ui_text_elements_cv(key)
values ('ready_to_start');


insert into ui_text_elements_cv(key)
values ('press_key_to_validate');

insert into ui_text_elements_cv(key)
values ('see_again_choice');

insert into ui_text_elements_cv(key)
values ('retest_choice');

insert into ui_text_elements_cv(key)
values ('no_retest_no_see_again_choice');

insert into ui_text_elements_cv(key)
values ('your_answer_is');

insert into ui_text_elements_cv(key)
values ('right_answer_is');

insert into ui_text_elements_cv(key)
values ('test_end');

insert into ui_text_elements_cv(key)
values ('reminder');

insert into ui_text_elements_cv(key)
values ('options');

insert into ui_text_elements_cv(key)
values ('choose_an_option');

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

-- test

insert into ui_text_elements(key, language, value)
values ('try_to_translate', 'french', 'Essaye de traduire ce mot !');

insert into ui_text_elements(key, language, value)
values ('write_answer', 'french', 'Ecris le mot en français');

insert into ui_text_elements(key, language, value)
values ('wrong_answer', 'french', 'Tu n''as pas écrit le mot correctement...');

insert into ui_text_elements(key, language, value)
values ('question', 'french', 'Question');

insert into ui_text_elements(key, language, value)
values ('answer', 'french', 'Réponse');

insert into ui_text_elements(key, language, value)
values ('press_key_to_try_again', 'french', 'Appuie sur cette touche pour réessayer !');

insert into ui_text_elements(key, language, value)
values ('right_answer', 'french', 'Bravo ! Tu as réussi !');

insert into ui_text_elements(key, language, value)
values ('test_intro_1', 'french', 'On va maintenant te présenter des paires de mots à la suite');


insert into ui_text_elements(key, language, value)
values ('test_intro_2', 'french', 'Essaye de retenir la traduction de tous les mots !');


insert into ui_text_elements(key, language, value)
values ('test_intro_3', 'french', 'Plus tard, on te donnera le mot Hongrois et tu devras écrire la traduction en français.');


insert into ui_text_elements(key, language, value)
values ('press_key_to_start', 'french', 'Appuie sur cette touche pour commencer !');


insert into ui_text_elements(key, language, value)
values ('try_to_remember', 'french', 'Essaye de retenir le mot numero');

insert into ui_text_elements(key, language, value)
values ('ready_to_start', 'french', 'Es-tu prêt à commencer le test ?');

insert into ui_text_elements(key, language, value)
values ('press_key_to_validate', 'french', 'Appuie sur cette touche pour valider ta reponse !');

insert into ui_text_elements(key, language, value)
values ('see_again_choice', 'french', 'Je veux revoir la paire de mots plus tard');

insert into ui_text_elements(key, language, value)
values ('retest_choice', 'french', 'Je veux me re-tester avec la paire plus tard');

insert into ui_text_elements(key, language, value)
values ('no_retest_no_see_again_choice', 'french', 'Je ne veux pas revoir la paire ni me re-tester');

insert into ui_text_elements(key, language, value)
values ('your_answer_is', 'french', 'Tu as ecris');

insert into ui_text_elements(key, language, value)
values ('right_answer_is', 'french', 'alors que la reponse correct est');

insert into ui_text_elements(key, language, value)
values ('test_end', 'french', 'Bravo ! C''est terminé !');


insert into ui_text_elements(key, language, value)
values ('reminder', 'french', 'Rappel');

insert into ui_text_elements(key, language, value)
values ('options', 'french', 'Options');

insert into ui_text_elements(key, language, value)
values ('choose_an_option', 'french', 'Choisis une des options suivantes: ');

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
values ('example', 'german', 'Probier mal dir dieses Beispiel zu merken ');

insert into ui_text_elements(key, language, value)
values ('source_language', 'german', 'Ungarisch');

insert into ui_text_elements(key, language, value)
values ('target_language', 'german', 'Deutsch');

-- test

insert into ui_text_elements(key, language, value)
values ('try_to_translate', 'german', 'Probier mal dieses Wort zu übersetzen:');

insert into ui_text_elements(key, language, value)
values ('write_answer', 'german', 'Schreib das Wort auf Deutsch');

insert into ui_text_elements(key, language, value)
values ('wrong_answer', 'german', 'Du hast das Wort nicht korrect geschrieben...');

insert into ui_text_elements(key, language, value)
values ('question', 'german', 'Frage');

insert into ui_text_elements(key, language, value)
values ('answer', 'german', 'Antwort');

insert into ui_text_elements(key, language, value)
values ('press_key_to_try_again', 'german', 'Diese Taste drücken um weiterzumachen');

insert into ui_text_elements(key, language, value)
values ('right_answer', 'german', 'Gut gemacht! Du hast es geschaffen!');

insert into ui_text_elements(key, language, value)
values ('test_intro_1', 'german', 'Jetzt werden dir 15 Wortpaare hintereinander gezeigt.');


insert into ui_text_elements(key, language, value)
values ('test_intro_2', 'german', 'Probier mal dir die Übersetzung aller Wörter zu merken');


insert into ui_text_elements(key, language, value)
values ('test_intro_3', 'german', 'Später wird dir das Wort auf ungarisch gegeben und du musst die Übersetzung auf Deutsch notieren.');


insert into ui_text_elements(key, language, value)
values ('press_key_to_start', 'german', 'Diese Taste drücken, um weiterzumachen.');


insert into ui_text_elements(key, language, value)
values ('try_to_remember', 'german', 'Probier mal dir das Wort zu merken.');

insert into ui_text_elements(key, language, value)
values ('ready_to_start', 'german', 'Bist to bereit ?');


insert into ui_text_elements(key, language, value)
values ('press_key_to_validate', 'german', 'Diese Taste drücken, um deine Antwort zu bestätigen.');

insert into ui_text_elements(key, language, value)
values ('see_again_choice', 'german', 'Ich möchte das Wortpaar später nochmal sehen.');

insert into ui_text_elements(key, language, value)
values ('retest_choice', 'german', 'Ich möchte das Wortpaar später nochmal üben.');

insert into ui_text_elements(key, language, value)
values ('no_retest_no_see_again_choice', 'german', 'Ich möchte das Wortpaar nicht mehr sehen oder nochmal üben.');

insert into ui_text_elements(key, language, value)
values ('your_answer_is', 'german', 'Du hast schrieben');

insert into ui_text_elements(key, language, value)
values ('right_answer_is', 'german', 'Leider ist die korrekte Antwort:');

insert into ui_text_elements(key, language, value)
values ('test_end', 'german', 'Gut gemacht! Du bist fertig!');


insert into ui_text_elements(key, language, value)
values ('reminder', 'german', 'Erinnerung');

insert into ui_text_elements(key, language, value)
values ('options', 'german', 'Optionen');

insert into ui_text_elements(key, language, value)
values ('choose_an_option', 'german', 'Wählen Sie eine der folgenden Optionen:');


-- misc

insert into ui_text_elements(key, language, value)
values ('press_key_to_continue', 'german', 'Eine Taste drücken, um weiterzumachen');


