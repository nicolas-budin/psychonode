var express = require('express');
var router = express.Router();

var {runTest, findTestById, createTest} = require('../services/TestService')

var {findTestElementById} = require('../services/TestElementService')
var {findTestDefinitionById, findAllActiveTestDefinitions} = require('../services/TestDefinitionService')

var {loggedIn, isAdmin} = require('../services/UserService')

/**

 */
router.post('/admin/:id/:action', isAdmin, function (req, res, next) {


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

}).post('/run/start', loggedIn, function (req, res, next) {

    let id = req.user.id;

    runTest(id).then(testData => {
        console.info("result of run test " + testData.testElement)

        if(testData.testElement == undefined) {
            res.render('test/run/testEnd');
        } else {
            res.render('test/run/testElement', {entry: testData.testElement, test: testData.test});
        }
    }).catch(error => {
        let msg = 'Unable to get test';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});

    });

}).post('/run/submit', loggedIn, function (req, res, next) {


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
                    if (!testElement.is_a_repeat) {
                        res.render('test/run/testWrongAnswer', {entry: test, right_answer: testDefinition.answer});
                    } else {
                        res.render('test/run/testWrongAnswerNoCorrection', {entry: test, right_answer: testDefinition.answer});
                    }
                } else {

                    if (!testElement.is_a_repeat) {
                        res.render('test/run/testCorrectAnswer', {entry: test, right_answer: testDefinition.answer});
                    } else {
                        res.render('test/run/testCorrectAnswerNoChoice', {entry: test, right_answer: testDefinition.answer});
                    }
                }

            }).catch(error => {throw error;})

        }).catch(error => {throw error;})

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })


}).post('/run/next', loggedIn, function (req, res, next) {

    let id = req.user.id;

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
            } else if (test.review_choice === 'test')  {
                testElement.is_redo = true;
            }
        }

        testElement.save().then(testElement => {

            runTest(id).then(testData => {

                console.info("result of run test " + testData.testElement)

                if (testData.testElement == undefined) {
                    res.render('test/run/testEnd');
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

                                res.render('test/run/testAnswer', {
                                    entry: test,
                                    right_answer: testData.testElement.answer
                                });

                            }).catch(error => {throw error;});

                        }).catch(error => {throw error;});

                    } else {
                        res.render('test/run/testElement', {entry: testData.testElement, test: testData.test});
                    }
                }

            }).catch(error => {throw error;});

        }).catch(error => {throw error;})

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })


}).post('/example/show', loggedIn, function (req, res, next) {

    let testDefinitionId = req.body.test_definition_id;

    let user = req.user;

    if(testDefinitionId == undefined) {

        findAllActiveTestDefinitions().then(testDefinitions => {

            const testDefinition = testDefinitions[0];

            res.render('test/example/example', {
                question: testDefinition.question,
                answer: testDefinition.answer,
                testDefinitionId: testDefinition.id,
                user: user
            });

        }).catch(error => {
            res.render('error', {message: "", error: error});
        })
    } else {

        findTestDefinitionById(testDefinitionId).then(testDefinition => {

            res.render('test/example/example', {
                question: testDefinition.question,
                answer: testDefinition.answer,
                testDefinitionId: testDefinition.id,
                user: user
            });

        }).catch(error => {
            res.render('error', {message: "", error: error});
        })
    }

}).post('/example/test', loggedIn, function (req, res, next) {

    let testDefinitionId = req.body.test_definition_id;

    findTestDefinitionById(testDefinitionId).then(testDefinition => {

        res.render('test/example/exampleTest', {question : testDefinition.question, testDefinitionId : testDefinition.id});

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })

}).post('/example/check', loggedIn, function (req, res, next) {

    let question = req.body.question;
    let answer = req.body.answer;
    let testDefinitionId = req.body.test_definition_id;

    findTestDefinitionById(testDefinitionId).then(testDefinition => {

        if(answer === testDefinition.answer) {

            res.render('test/example/exampleSuccess', {
                question: question,
                answer: testDefinition.answer,
                testDefinitionId: testDefinition.id
            });

        } else {

            res.render('test/example/exampleFailed', {
                question: question,
                answer: testDefinition.answer,
                testDefinitionId: testDefinition.id
            });

        }

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })

}).post('/memorize', loggedIn, function (req, res, next) {

    let testDefinitionIndex = 1;

    if(req.body.test_definition_index != undefined) {
        testDefinitionIndex = req.body.test_definition_index;
        testDefinitionIndex++;
    }

    findAllActiveTestDefinitions().then(testDefinitions => {

        if(testDefinitionIndex < testDefinitions.length) {

            const testDefinition = testDefinitions[testDefinitionIndex];

            res.render('test/memorize', {
                question: testDefinition.question,
                answer: testDefinition.answer,
                testDefinitionIndex: testDefinitionIndex
            });
        } else {

            res.render('test/startTest');
        }

    }).catch(error => {
        res.render('error', {message: "", error: error});
    })
}).get('/download', isAdmin, function(req, res){
    const file = `${__dirname}/../sample.db`;
    res.download(file);
}).get('/help', isAdmin, function(req, res){
    res.render('admin/help');
});

module.exports = router;
