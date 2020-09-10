var express = require('express');
var router = express.Router();

var {findTestElementsByTestId} = require('./../services/OrmService')

/**
 * display test elements
 */
router.get('/:id', function (req, res, next) {

    findTestElementsByTestId(req.params.id).then(testElements => {
        res.render('test', {testElements: testElements});
    }).catch(error => {
        let msg = 'Unable to get test elements';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

});

module.exports = router;