var express = require('express');
var router = express.Router();

var {findTestDefinitionById} = require('./../services/OrmService')

/**
 * shows entries in test definition
 */
router.get('/:id', function (req, res, next) {

    findTestDefinitionById((req.params.id)).then (tests => {
            res.render('testDefinition', {tests: tests});
        }).catch(error => {

            let msg = 'Unable to get tests from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
