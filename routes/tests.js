var express = require('express');
var router = express.Router();

var {findTestById, createTest} = require('./../services/OrmService')


/**

 */
router.post('/:id/:action', function (req, res, next) {


    const id = req.params.id
    const action = req.params.action;
    const user_id = req.body.user_id;

    console.log("id: " + id + " action: " + action);

    findTestById(id).then(test => {

        switch (action) {

            case 'next':
                console.info("handling next action");
                createTest(user_id, false, test.id).then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                });
                break;


            case 'new':
                console.info("handling new action");
                createTest(user_id, true).then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                });
                break;

            case 'abort':
                console.info("handling abort action");
                test.is_aborted = true;
                test.save().then(test => {
                    res.redirect('/users/' + user_id + '/tests');
                }).catch(error => {
                    throw error;
                })
                break;

            default:
        }

    }).catch(error => {

        let msg = 'Unable to handle action' + action + " for test " + id;
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    })

});

module.exports = router;
