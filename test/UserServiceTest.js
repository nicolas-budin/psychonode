var assert = require('assert');

var {findUserById, findUserByLogin, findAllUsers} = require('../services/UserService')

describe('User Service', function() {

    describe('findUserById', function() {
        it('should return one entry', function() {
            findUserById(1).then(user => {
                assert.ok(user != null && user != undefined)
                assert.match(user.id, id);
            });
        });
    });

    describe('findUserByLogin', function() {
        it('should return one entry', function() {
            findUserByLogin("admin").then(user => {
                assert.ok(user != null && user != undefined)
                assert.match(user.id, id);
            });
        });
    });


    describe('findAllUsers', function() {
        it('should return many entry', function() {
            findAllUsers().then(users => {
                assert.ok(users != null && users != undefined)
                assert.ok(users.length > 1)
            });
        });
    });


});