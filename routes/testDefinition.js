var express = require('express');
var router = express.Router();

var {findAllActiveTestDefinitions} = require('../services/TestDefinitionService')
var {TestDefinitionSet, findAllTestDefinitionSet, findTestDefinitionSetById, findTestDefinitionSetAnDefinitionsById} = require('../services/TestDefinitionSetService')

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

}).post('/save', isAdmin, function (req, res, next) {


    findTestDefinitionSetById(req.body.id).then(testDefinition => {

        testDefinition.is_active = req.body.is_active != undefined ? true : false;

        testDefinition.save().then(testDefinition => {

                console.info("testDefinition " + testDefinition.id + " updated");

                res.redirect('/test_definition/');

            }).catch(error => {
                let msg = 'Unable to update definition set: ' + user.id;
                console.error(msg, error);
                res.render('error', {message: msg, error: error});
            })

        }).catch(error => {
            let msg = 'Unable to get definition set';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        });



}).get('/:id', isAdmin, function (req, res, next) {

    findTestDefinitionSetAnDefinitionsById(req.params.id).then(data => {
        res.render('admin/testDefinition',   {testDefinitions: data.testDefinitions, testDefinitionsSet: data.testDefinitionsSet});
    }).catch(error => {

            let msg = 'Unable to get test definitions from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
