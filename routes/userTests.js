var express = require('express');
var router = express.Router();

var {findTestsByUserId} = require('./../services/OrmService')

/**
 * display tests of the user
 */
router.get('/:id', function (req, res, next) {

    findTestsByUserId(req.params.id).then(tests => {
        res.render('tests', {tests: tests});
    }).catch(error => {
        let msg = 'Unable to get user tests';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

});

module.exports = router;