var express = require('express');
var router = express.Router();


var {runTest} = require('./../services/TestService')

/**
 * starts test
 */
router.get('/:login', function (req, res, next) {

    let login = req.params.login;

    runTest(login).then(testData => {
        console.info("result of run test " + testData.testElement)

        if(testData.testElement == undefined) {
            res.render('message', {message: "test is finished"});
        } else {
            res.render('testElement', {user: login, entry: testData.testElement, test: testData.test});
        }
    }).catch(error => {
        let msg = 'Unable to get test';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});

    });

});

module.exports = router;