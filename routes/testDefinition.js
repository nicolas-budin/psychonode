var express = require('express');
var router = express.Router();

var {findAllActiveTestDefinitions} = require('../services/TestDefinitionService')

var {loggedIn, isAdmin} = require('../services/UserService')



/**
 * shows entries in test definition
 */
router.get('/', isAdmin, function (req, res, next) {

    findAllActiveTestDefinitions().then(testDefinitions => {
        res.render('admin/testDefinition',   {testDefinitions: testDefinitions});
    }).catch(error => {

            let msg = 'Unable to get tests from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
