var express = require('express');
var router = express.Router();

const passport = require('passport');

var {getUITextElementsMap} = require('../services/LanguageService');

router.get('/', function (req, res, next) {

    let language = 'french';

    if (req.query.language != undefined) {
        language = req.query.language;
    }

    getUITextElementsMap(language).then(uITextElementsMap => {

        res.render('login', {uITextElementsMap: uITextElementsMap});

    }).catch(error => {
            msg = 'Failed to get user language';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    )


}).post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {
            console.log(info);
            return res.redirect('/');
        }
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        if (!user) {
            console.log(err);
            return res.redirect('/');
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            } else {

                if (user.is_admin) {
                    return res.redirect('/users/')
                } else {

                    return res.redirect('/users/' + user.id)
                }
            }
        })
    })(req, res, next);
}).get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
