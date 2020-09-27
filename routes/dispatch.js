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

                    runTest(user.id).then(testData => {
                        console.info("result of run test " + testData.testElement)

                        if(testData.testElement == undefined) {
                            res.render('message', {message: "test is finished"});
                        } else {
                            res.render('testElement', {user: user.id, entry: testData.testElement, test: testData.test});
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


    let test = {

        test_id: req.body.test_id,
        test_element_id: req.body.test_element_id,
        test_definition_id: req.body.test_definition_id,
        question: req.body.question,
        answer: req.body.answer,
        review_choice : req.body.review_choice,
        is_first_step : req.body.is_first_step
    }

    if(req.params.action === 'submit') {


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

                        res.render('testCorrectAnswer', {user: user, entry: test, right_answer : testDefinition.answer});

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


        findTestElementById(test.test_element_id).then(testElement => {

            if (test.review_choice != undefined) {

                if(test.review_choice === 'see') {
                    testElement.is_redisplay = true;
                } else {
                    testElement.is_redo = true;
                }
            }

            testElement.save().then(testElement => {

                runTest(user).then(testData => {

                    console.info("result of run test " + testData.testElement)

                    if(testData.testElement == undefined) {
                        res.render('message', {message: "test is finished"});
                    } else {
                        res.render('testElement', {user: user, entry: testData.testElement, test: testData.test});
                    }

                }).catch(error => {
                    let msg = 'Unable to get test';
                    res.render('error', {message: "", error: error});

                });

            }).catch(error => {
                res.render('error', {message: "", error: error});
            })


        }).catch(error => {
            res.render('error', {message: "", error: error});
        })





    }

});

module.exports = router;