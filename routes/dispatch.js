var express = require('express');
var router = express.Router();

var {findUserById} = require('./../services/OrmService')
var {runTest} = require('./../services/appService')

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
                        // TODO : test page
                        res.render('testElement', {user: user, entry : test});

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

    const question = req.body.question;
    const answer = req.body.answer;

    const msg = question + ":" + answer;

    console.log(msg);
    res.render('message', {message: msg});

});

module.exports = router;