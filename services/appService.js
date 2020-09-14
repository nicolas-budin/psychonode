const {createTestElement, findAvailableTestDefinitionsByTestId, findTestsByUserId, findAvailableTestElementsAndTemplatesByTestId} = require('./OrmService');

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


const getNextTestElement = function (testId) {

    return new Promise((success, error) => {

        findAvailableTestElementsAndTemplatesByTestId(testId).then(
            result => {
                if (result.length == 0) {
                    findAvailableTestDefinitionsByTestId(testId).then(testDefinitions => {
                        if (testDefinitions.length > 0) {
                            const testDefinitionId = testDefinitions[0].id;
                            createTestElement(testDefinitionId, testId).then(testElement => {
                                findAvailableTestElementsAndTemplatesByTestId(testId).then(result => {
                                    success(result[0]);
                                }).catch(error)
                            }).catch(error)
                        } else {
                            success(undefined);
                        }
                    }).catch(error);

                } else if (result.length == 1) {

                    // there is a current test and an available question
                    console.log("found 1 test element in " + testId)
                    success(result[0]);

                } else {
                    throw Error("returning more than one value: " + result);
                }

            }
        ).catch(error);
    });
}

exports.runTest = runTest;