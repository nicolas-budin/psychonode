const {getNextTestElement, findTestsByUserId} = require('./OrmService');

/**
 *
 * @param userId
 */
const runTest = function (userId) {

    return new Promise((success, error) => {

        findTestsByUserId(userId).then(tests => {

            if (tests.length == 0) {

                throw new Error("Not test found for user " + userId);

            } else if (tests.length == 1) {

                let testId = tests[0].id;
                getNextTestElement(testId).then(success).catch(error);

            } else {
                throw Error("returning more than one value: " + tests);
            }

        }).catch(error);
    })
}


exports.runTest = runTest;