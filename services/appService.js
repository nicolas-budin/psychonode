const {findTestsByUserId, findAvailableTestElementsAndTemplatesByTestId} = require('./OrmService');

/**
 *
 * @param userId
 */
const runTest = function (userId) {

    return new Promise((success, error) => {

        findTestsByUserId(userId).then(tests => {

            if (tests.length == 0) {

                // there is no current question so check if there is a current test
                // and if not create one and get the first question
                console.log("found 0 test elements in " + testId)

                // TODO add test (see test type, i.e. test or final test), recursive call

            } else if (tests.length == 1) {

                let testId=tests[0].id;

                findAvailableTestElementsAndTemplatesByTestId(testId).then(

                    result => {

                        if (result.length == 0) {

                            // TODO add first element
                            console.log("found 0 test elements in " + testId)
                            return result;

                        } else if (result.length == 1) {

                            // there is a current test and an available question
                            console.log("found 1 test element in " + testId)
                            return result;

                        } else {
                            throw Error("returning more than one value: " + result);
                        }

                    }
                ).then(success).catch(error);

            } else {
                throw Error("returning more than one value: " + result);
            }

        }).catch(error);
    })
}

exports.runTest = runTest;