var assert = require('assert');

var {findTestsByUserId, findTestById} = require('../services/TestService')

describe('Test Service', function() {

    describe('findTestById', function() {
        it('should return one entry', function() {
            findTestById(1).then(result => {
                assert.ok(result != null && result != undefined)
                assert.match(result.id, id);
            });
        });
    });


    describe('findTestsByUserId', function() {
        it('should return one entry', function() {
            findTestsByUserId(1).then(result => {
                assert.ok(result != null && result != undefined)
                assert.match(result.id, id);
            });
        });
    });

});