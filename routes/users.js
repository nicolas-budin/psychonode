var express = require('express');
var router = express.Router();


const {body, validationResult} = require('express-validator');

var {findTestElementsByTestId} = require('../services/TestElementService')
var {User, isAdmin, loggedIn, findAllUsers, findUserById} = require('../services/UserService')
var {findTestsByUserId} = require('../services/TestService')


/**
 * - shows list of all users
 * - shows data for one user
 */
router.get('/', isAdmin, function (req, res, next) {


    findAllUsers().then(users => {
        res.render('admin/users', {users: users});
    }).catch(error => {

            let msg = 'Unable to get user list from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/new', isAdmin, function (req, res, next) {

    let user = {id: '', age: '', level: '', language: '', sex: ''}
    res.render('admin/user', {user: user});

}).get('/:id', loggedIn, function (req, res, next) {

    let user = req.user;

    /*
    if (user.login === "admin") {
        res.render('error', {message: "admin cannot be viewed / modified"});
    }
    */


    if (req.user.is_admin) {
        res.render('admin/user', {user: user});
    } else {
        res.render('user', {user: user});
    }


}).get('/:id/tests', isAdmin, function (req, res, next) {

    findTestsByUserId(req.params.id).then(tests => {
        res.render('admin/tests', {userId: req.params.id, tests: tests});
    }).catch(error => {
        let msg = 'Unable to get user tests';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:userId/tests/:id', isAdmin, function (req, res, next) {

    findTestElementsByTestId(req.params.id).then(testElements => {
        res.render('admin/test', {testElements: testElements, userId: req.params.userId, testId: req.params.id});
    }).catch(error => {
        let msg = 'Unable to get test elements';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).post('/save', loggedIn, [body('age', '').isInt({
    gt: 9,
    lt: 21
})], function (req, res, next) {

    let user = req.user;
    let formUser = {age: req.body.age, level: req.body.level, sex: req.body.sex}

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        let userCopy = JSON.parse(JSON.stringify(user));

        userCopy.age = formUser.age;
        userCopy.age = formUser.age;
        userCopy.age = formUser.age;
        userCopy.uITextElementsMap = user.uITextElementsMap;

        res.render('user', {errors: errors, user: userCopy});

    } else {

        user.age = formUser.age;
        user.level = formUser.level;
        user.sex = req.body.sex;

        user.save().then(user => {

            console.info("user " + user.id + " updated");

            findTestsByUserId(user.id).then(tests => {

                if (tests.length > 0 && !tests[0].is_first_step) {
                    res.redirect(307, '/tests/run/start');
                } else {
                    res.redirect(307, '/tests/example/show');
                }
            }).catch(error => {
                let msg = 'Unable to get user tests';
                console.error(msg, error);
                res.render('error', {message: msg, error: error});
            });


        }).catch(error => {
            let msg = 'Unable to update user: ' + user.id;
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        })


    }
}).post('/admin/save', isAdmin, function (req, res, next) {

    let formUser = {
        id: req.body.id,
        login: req.body.login,
        age: req.body.age,
        level: req.body.level,
        sex: req.body.sex,
        language: req.body.language,
        is_active: req.body.is_active != undefined ? true : false
    }

    findUserById(formUser.id).then(user => {

        user.login = formUser.login;
        user.age = formUser.age;
        user.level = formUser.level;
        user.sex = formUser.sex;
        user.language = formUser.language;
        user.is_active = formUser.is_active

        user.save().then(user => {

            console.info("user " + user.id + " updated");
            res.redirect('/users/');

        }).catch(error => {
            let msg = 'Unable to update user: ' + user.id;
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        })

    }).catch(error => {

        console.info("user " + formUser.id + " does not exists -> will create it");

        User.create(formUser).then(user => {
            console.info("user " + user.id + " created");
            res.redirect('/users/');

        }).catch(error => {
            let msg = 'Unable to create user: ' + formUser.id;
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        })
    });

});

module.exports = router;
