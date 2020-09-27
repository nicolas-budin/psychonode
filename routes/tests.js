var express = require('express');
var router = express.Router();

var {runTest, findTestById, createTest} = require('../services/TestService')

var {findTestElementById} = require('../services/TestElementService')
var {findTestDefinitionById} = require('../services/TestDefinitionService')


/**

 */
router.post('/admin/:id/:action', function (req, res, next) {


    const id = req.params.id
    const action = req.params.action;
    const user_id = req.body.user_id;

    console.log("id: " + id + " action: " + action);

    findTestById(id).then(test => {

        switch (action) {

            case 'next':
                console.info("handling next action");
                createTest(user_id, false, test.id).then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                });
                break;


            case 'new':
                console.info("handling new action");
                createTest(user_id, true).then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                });
                break;

            case 'abort':
                console.info("handling abort action");
                test.is_aborted = true;
                test.save().then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                })
                break;

            default:
        }

    }).catch(error => {

        let msg = 'Unable to handle action' + action + " for test " + id;
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    })

}).post('/run/:id/submit', function (req, res, next) {

    const user = req.body.user;

    let test = {

        test_id: req.body.test_id,
        test_element_id: req.body.test_element_id,
        test_definition_id: req.body.test_definition_id,
        question: req.body.question,
        answer: req.body.answer,
        review_choice: req.body.review_choice,
        is_first_step: req.body.is_first_step
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
                    res.render('testAnswer', {user: user, entry: test, right_answer: testDefinition.answer});
                } else {

                    res.render('testCorrectAnswer', {user: user, entry: test, right_answer: testDefinition.answer});

                }

            }).catch(error => {throw error;})

        }).catch(error => {throw error;})

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })


}).post('/run/:id/next', function (req, res, next) {

    const user = req.body.user;

    let test = {

        test_id: req.body.test_id,
        test_element_id: req.body.test_element_id,
        test_definition_id: req.body.test_definition_id,
        question: req.body.question,
        answer: req.body.answer,
        review_choice: req.body.review_choice,
        is_first_step: req.body.is_first_step
    }


    findTestElementById(test.test_element_id).then(testElement => {

        if (test.review_choice != undefined) {

            if (test.review_choice === 'see') {
                testElement.is_redisplay = true;
            } else {
                testElement.is_redo = true;
            }
        }

        testElement.save().then(testElement => {

            runTest(user).then(testData => {

                console.info("result of run test " + testData.testElement)

                if (testData.testElement == undefined) {
                    res.render('message', {message: "test is finished"});
                } else {

                    if (testData.testElement.is_success) {

                        findTestElementById(testData.testElement.id).then(testElement => {

                            testElement.is_done = true;
                            testElement.save().then(testElement => {

                                let test = {

                                    test_id: testData.testElement.test_id,
                                    test_element_id: testData.testElement.id,
                                    test_definition_id: testData.testElement.test_definition_id,
                                    question: testData.testElement.question,
                                    answer: testData.testElement.answer
                                }

                                res.render('testAnswer', {
                                    user: user,
                                    entry: test,
                                    right_answer: testData.testElement.answer
                                });

                            }).catch(error => {throw error;});

                        }).catch(error => {throw error;});

                    } else {
                        res.render('testElement', {user: user, entry: testData.testElement, test: testData.test});
                    }
                }

            }).catch(error => {throw error;});

        }).catch(error => {throw error;})

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })


});

module.exports = router;
