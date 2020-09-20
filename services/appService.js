const {getNextTestElement, createTest, findTestsByUserId} = require('./OrmService');


/**
 * runs a test =>
 * @param userId
 * @returns {Promise<*|undefined>}
 */
const getTest = async (userId) => {

    try {

        let test = undefined;

        const tests = await findTestsByUserId(userId)

        if (tests.length == 0) {

            test = await createTest(userId);

        } else {

            test = tests[0]
        }

        return test;

    } catch (error) {
        console.error("Failed to run test for user: " + userId, error);
        throw error;
    }
}


const runTest = async (userId) => {

    try {

        const test = await getTest(userId);
        const testElment = await getNextTestElement(test.id);

        return testElment;

    } catch (error) {
        console.error("Failed to run test for user: " + userId, error);
        throw error;
    }
}

exports.getTest = getTest;
exports.runTest = runTest;