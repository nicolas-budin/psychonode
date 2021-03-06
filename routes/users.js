var express = require('express');
var router = express.Router();


const {body, validationResult} = require('express-validator');

var {User, isAdmin, loggedIn, findUserById} = require('../services/UserService')
var {findTestsByUserId, getTestData, getUserTestsData, findAllUsersAndTests} = require('../services/TestService')


/**
 * - shows list of all users
 * - shows data for one user
 */
router.get('/all_users', isAdmin, function (req, res, next) {

    findAllUsersAndTests().then(users => {
        res.render('admin/users', {users: users});
    }).catch(error => {

            let msg = 'Unable to get user list from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/', isAdmin, function (req, res, next) {


    let user = req.user;

    findAllUsersAndTests().then(users => {
        res.render('admin/users', {users: users.filter(listUser => listUser.login === user.login || listUser.parent == user.id)});
    }).catch(error => {

            let msg = 'Unable to get user list from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/new', isAdmin, function (req, res, next) {

    let user = {id: '', age: '', level: '', language: '', sex: ''}
    res.render('admin/user', {user: user});

}).get('/user', loggedIn, function (req, res, next) {

    let user = req.user;
    res.render('user', {user: user});

}).get('/:id', isAdmin, function (req, res, next) {

    findUserById(req.params.id).then(user => {

        if (user.is_admin) {
            res.render('error', {message: "admin cannot be viewed / modified"});
        } else {
            res.render('admin/user', {user: user});
        }
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:id/tests', isAdmin, function (req, res, next) {

    findUserById(req.params.id).then(user => {

        getUserTestsData(user.id).then(tests => {
            res.render('admin/tests', {user: user, tests: tests});
        }).catch(error => {
            let msg = 'Unable to get user tests';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        })

    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:userId/tests/:id', isAdmin, function (req, res, next) {


    findUserById(req.params.userId).then(user => {

        getTestData(req.params.id).then(test => {

            res.render('admin/test', {
                test: test,
                user: user
            });

        }).catch(error => {
            let msg = 'Unable to get test elements';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        })

    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).post('/save', loggedIn, [
        body('age', '').isInt({gt: 9, lt: 21}),
        body('level').notEmpty().isAlphanumeric(),
        body('sex').notEmpty().isIn(['m', 'f'])],
    function (req, res, next) {

        let user = req.user;
        let formUser = {age: req.body.age, level: req.body.level, sex: req.body.sex}

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            let userCopy = JSON.parse(JSON.stringify(user));

            userCopy.age = formUser.age;
            userCopy.level = formUser.level;
            userCopy.sex = formUser.sex;
            userCopy.uITextElementsMap = user.uITextElementsMap;

            res.render('user', {errors: errors, user: userCopy});

        } else {

            user.age = formUser.age;
            user.level = formUser.level;
            user.sex = req.body.sex;

            user.save().then(user => {

                console.info("user " + user.id + " updated");

                findTestsByUserId(user.id).then(tests => {

                    if (tests.length > 0 && (!tests[0].is_first_step || user.login === "nb")) {
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
    }).post('/admin/save', isAdmin, [
        body('age').optional({nullable: true, checkFalsy: true}).isInt(),
        body('degree').optional({nullable: true, checkFalsy: true}).isIn(['vg','vp','college']),
        body('grade').optional({nullable: true, checkFalsy: true}).isInt()],
    function (req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            res.render('error', {message: JSON.stringify(errors.errors), error: "error"});

        } else {

            let formUser = {
                id: req.body.id,
                login: req.body.login,
                age: req.body.age,
                level: req.body.level,
                degree: req.body.degree,
                grade: req.body.grade,
                parent: req.user.id,
                sex: req.body.sex,
                language: req.user.language,
                is_active: req.body.is_active != undefined ? true : false,
                is_control: req.body.is_control != undefined ? true : false
            }

            findUserById(formUser.id).then(user => {

                user.login = formUser.login;
                user.age = formUser.age;
                user.level = formUser.level;
                user.degree = formUser.degree;
                user.grade = formUser.grade;
                user.parent = formUser.parent;
                user.sex = formUser.sex;
                user.language = formUser.language;
                user.is_active = formUser.is_active
                user.is_control = formUser.is_control

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
        }

    });

module.exports = router;
