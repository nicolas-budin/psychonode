var express = require('express');
var router = express.Router();

var {User, isAdmin, loggedIn, findAllUsers, findUserById} = require('../services/UserService')

var {exportTestCsv} = require('../services/ExportService')



/**
 * shows entries in test definition
 */
router.get('/csv', isAdmin, function (req, res, next) {

    exportTestCsv().then(csv => {

        res.header('Content-Type', 'text/csv');
        res.attachment("export.csv");
        return res.send(csv);

    }).catch(error => {

            let msg = 'Unable to export csv';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
