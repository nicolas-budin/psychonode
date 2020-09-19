var express = require('express');
var router = express.Router();

var {findAllTestDefinitions} = require('./../services/OrmService')

/**
 * shows entries in test definition
 */
router.get('/', function (req, res, next) {

    findAllTestDefinitions().then(testDefinitions => {
        res.render('testDefinition', {testDefinitions: testDefinitions});
    }).catch(error => {

            let msg = 'Unable to get tests from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
