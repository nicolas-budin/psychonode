let assert = require('assert');

let {exportUserTestCsv, exportTestCsv, exportUserTests, exportTests, getUserTestData , getTestData} = require('../services/ExportService')

describe('Export Service', function() {

    describe('getTestData', function() {
        it('should return all test data', function() {
            getTestData().then(entries => {
                assert.ok(entries != null && entries != undefined)
                assert.ok(entries.length > 1)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

    describe('exportTests', function() {
        it('should return all export entries', function() {
            exportTests().then(entries => {
                assert.ok(entries != null && entries != undefined)
                assert.ok(entries.length > 1)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

    describe('exportTestCsv', function() {
        it('should return all export entries', function() {
            exportTestCsv().then(csv => {
                console.log(csv);
                assert.ok(csv != null && csv != undefined)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

});


describe('Export Summary Service', function() {

    describe('getUserTestData', function() {
        it('should return all test data', function() {
            getUserTestData().then(entries => {
                assert.ok(entries != null && entries != undefined)
                assert.ok(entries.length > 1)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

    describe('exportUserTests', function() {
        it('should return all export entries', function() {
            exportUserTests().then(entries => {
                assert.ok(entries != null && entries != undefined)
                assert.ok(entries.length > 1)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });


    describe('exportUserTestCsv', function() {
        it('should return all export entries', function() {
            exportUserTestCsv().then(csv => {
                console.log(csv);
                assert.ok(csv != null && csv != undefined)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

});