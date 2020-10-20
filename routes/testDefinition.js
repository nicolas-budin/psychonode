var express = require('express');
var router = express.Router();

var {findAllActiveTestDefinitions, findTestDefinitionBySetId} = require('../services/TestDefinitionService')
var {findAllTestDefinitionSet} = require('../services/TestDefinitionSetService')

var {loggedIn, isAdmin} = require('../services/UserService')



/**
 * shows entries in test definition
 */
router.get('/', isAdmin, function (req, res, next) {

    findAllTestDefinitionSet().then(testDefinitionSets => {
        res.render('admin/testDefinitionSets',   {testDefinitionSets: testDefinitionSets});
    }).catch(error => {

            let msg = 'Unable to get definition sets from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/active', isAdmin, function (req, res, next) {

    findAllActiveTestDefinitions().then(testDefinitions => {
        res.render('admin/activeTestDefinition',   {testDefinitions: testDefinitions});
    }).catch(error => {

            let msg = 'Unable to get test definitions from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/:id', isAdmin, function (req, res, next) {

    findTestDefinitionBySetId(req.params.id).then(testDefinitions => {
        res.render('admin/testDefinition',   {testDefinitions: testDefinitions});
    }).catch(error => {

            let msg = 'Unable to get test definitions from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
