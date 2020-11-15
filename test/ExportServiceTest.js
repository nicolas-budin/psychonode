let assert = require('assert');

let {exportTestCsv, exportTests, getTestData} = require('../services/ExportService')

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
                assert.ok(csv != null && csv != undefined)
            }).catch(error => {
                assert.fail("test failed");
            });
        });
    });

});