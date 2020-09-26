var express = require('express');
var router = express.Router();

var {findTestElementById} = require('../services/TestElementService')
var {findTestDefinitionById} = require('../services/TestDefinitionService')
var {findUserById} = require('../services/UserService')
var {runTest} = require('./../services/TestService')

/**
 * display welcome page when user is identified.
 */
router.post('/', function (req, res, next) {

    var login = req.body.login;

    findUserById(login).then(user => {

        // login
        if (req.body.age == undefined) {
            res.render('user', {user: user});

            // save form
        } else {

            // form is not correctly filled
            if (req.body.age == '' || req.body.level == '' || req.body.sex == '') {
                res.render('user', {user: user});

                // save form
            } else {

                user.age = req.body.age;
                user.level = req.body.level;
                user.sex = req.body.sex;
                user.save().then(user => {

                    console.info("user " + user.id + " updated");

                    runTest(user.id).then(test => {
                        console.info("result of run test " + test)

                        if(test == undefined) {
                            res.render('message', {message: "test is finished"});
                        } else {
                            res.render('testElement', {user: user.id, entry: test});
                        }
                    }).catch(error => {
                        let msg = 'Unable to get test';
                        console.error(msg, error);
                        res.render('error', {message: msg, error: error});

                    });

                }).catch(error => {
                    let msg = 'Unable to update user: ' + user.id;
                    console.error(msg, error);
                    res.render('error', {message: msg, error: error});
                })
            }
        }
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).post('/:action', function (req, res, next) {


    const user = req.body.user;

    if(req.params.action === 'submit') {

        let test = {

            test_id: req.body.test_id,
            test_element_id: req.body.test_element_id,
            test_definition_id: req.body.test_definition_id,
            question: req.body.question,
            answer: req.body.answer,
        }

        findTestDefinitionById(test.test_definition_id).then(testDefinition => {

            findTestElementById(test.test_element_id).then(testElement => {

                testElement.user_answer = test.answer;
                testElement.is_done = true;

                if (testDefinition.answer === test.answer) {
                    testElement.is_success = true;
                }

                testElement.save().then(testElement => {

                    if (!testElement.is_success) {
                        res.render('testAnswer', {user: user, entry: test, right_answer : testDefinition.answer});
                    } else {

                        runTest(user).then(test => {
                            console.info("result of run test " + test)

                            if(test == undefined) {
                                res.render('message', {message: "test is finished"});
                            } else {
                                res.render('testElement', {user: user, entry: test});
                            }

                        }).catch(error => {
                            let msg = 'Unable to get test';
                            res.render('error', {message: "", error: error});

                        });

                    }

                }).catch(error => {
                    res.render('error', {message: "", error: error});
                })


            }).catch(error => {
                res.render('error', {message: "", error: error});
            })

        }).catch(error => {
            res.render('error', {message: "", error: error});
        })


    } else {

        runTest(user).then(test => {
            console.info("result of run test " + test)
            res.render('testElement', {user: user, entry : test});

        }).catch(error => {
            let msg = 'Unable to get test';
            res.render('error', {message: "", error: error});

        });

    }



});

module.exports = router;