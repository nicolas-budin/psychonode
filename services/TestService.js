const {QueryTypes, Sequelize, DataTypes, Model} = require('sequelize');

const {getRedoAndRedisplayTestElements, TestElement, getAvailableTestElements, getFailedTestElements} = require('./TestElementService');

const {findAllActiveTestDefinitions} = require('./TestDefinitionService');


// creates rdbms access
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sample.db'
});

// tests connection
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(error => {
    console.error('Unable to connect to the database:', error)
});


//
// entities
//




class Test extends Model {
}

Test.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    setId: {
        type: DataTypes.INTEGER,
    },
    children_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },

    is_first_step: {
        type: DataTypes.BOOLEAN
    },
    is_completed: {
        type: DataTypes.BOOLEAN
    },
    is_aborted: {
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {

    sequelize,
    modelName: 'test',
    freezeTableName: true
});





/**
 * gets all tests for a user, desc order by id (i.e. last created first)
 * @param userId
 * @returns {Promise<*>}
 */
const findTestsByUserId = async (userId) => {
    try {
        const tests = Test.findAll({
            where: {
                user_id: userId
            },
            order: [['id', 'DESC']]
        });

        return tests;

    } catch (error) {
        console.error("Failed to get tests for user: " + userId, error);
        throw error;
    }
}


const findTestById = async (id) => {
    try {
        const test = Test.findByPk(id);
        return test;

    } catch (error) {
        console.error("Failed to get test for id: " + id, error);
        throw error;
    }
}

/**
 * creates a test for user with userId
 * @param userId
 * @param testType [true | false | undefined].
 * @returns {Promise<Test>}
 */
const createTest = async (userId, testType = undefined, parentId = undefined) => {

    try {

        let is_first_step = testType;
        if (testType == undefined) {

            is_first_step = true;
            const tests = await findTestsByUserId(userId);

            if(tests.length > 0) {
                const lastTest = tests[0];
                is_first_step = lastTest.is_first_step ? false : true;
            }
        }

        const test = await Test.create({user_id: userId, is_first_step: is_first_step});
        if(parentId != undefined) {
            let parentTest = await findTestById(parentId);
            parentTest.children_id = test.id;
            await parentTest.save();
        }
        return test;

    } catch (error) {
        console.error("Failed to create test for user: " + userId, error);
        throw error;
    }
}


const getCurrentTestIteration = (testId) => {

    return sequelize.query(
        "select te.iteration\n" +
        "from test t,\n" +
        "     test_element te\n" +
        "where t.id = :testId\n" +
        "  and te.test_id = t.id\n" +
        "order by te.iteration desc\n" +
        "limit 1",
        {
            type: QueryTypes.SELECT,
            replacements: {testId: testId},
            logging: console.log,
            raw: false
        });
}


/**
 * gets last user test. Creates a new test if user has no test.
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

            test = tests[0];

            if(test.is_aborted) {
                test =  await createTest(userId, test.is_first_step);
            }
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

        return {test: test, testElement: testElment};

    } catch (error) {
        console.error("Failed to run test for user: " + userId, error);
        throw error;
    }
}


const getNextTestElement = async (testId) => {

    try {

        let returnedTestElement = undefined;


        let test = await findTestById(testId);

        // gets the current iteration
        const iterations = await getCurrentTestIteration(testId)

        // case where there is an existing iteration
        if (iterations.length != 0) {

            const iteration = iterations[0].iteration;

            // gets the available (i.e. not tested) iteration elements
            const availableElements = await getAvailableTestElements(testId, iteration)

            // not available elements -> check if must create new iteration
            if (availableElements.length == 0) {

                console.log("No tests elements left in iteration " + iteration);

                // gets failed elements, i.e. that should be in the next iteration
                const failedElements = await getFailedTestElements(testId, iteration)

                const redoAndRedisplayElements = await getRedoAndRedisplayTestElements(testId, iteration);

                if ((failedElements.length > 0 || redoAndRedisplayElements.length > 0) && test.is_first_step) {

                    const newIteration = iteration + 1;

                    console.log("creating new iteration (" + newIteration + ") with " + failedElements.length + " failed elements");

                    // failed elements
                    for (let failedElement of failedElements) {

                        let testElement = await TestElement.create({
                            test_id: testId,
                            test_definition_id: failedElement.test_definition_id,
                            question : failedElement.question,
                            answer : failedElement.answer,
                            iteration: newIteration
                        })

                        if (returnedTestElement == undefined) {
                            returnedTestElement = testElement;
                        }
                    }

                    console.log("adding to iteration (" + newIteration + ") " + failedElements.length + " redo / redisplay elements");

                    // redo / redisplay elements
                    for (let redoAndRedisplayElement of redoAndRedisplayElements) {

                        let testElement = await TestElement.create({
                            test_id: testId,
                            test_definition_id: redoAndRedisplayElement.test_definition_id,
                            question : redoAndRedisplayElement.question,
                            answer : redoAndRedisplayElement.answer,
                            iteration: newIteration,
                            is_success: redoAndRedisplayElement.is_redisplay ? true : false,
                            is_a_repeat: true

                        })

                        if (returnedTestElement == undefined) {
                            returnedTestElement = testElement;
                        }
                    }

                } else {

                    if(!test.is_completed) {
                        test.is_completed = true;
                        await test.save();
                    }

                    console.log("end of the test " + testId + " (iteration " + iteration +  ")");
                }

            } else {

                console.log("there are " + availableElements.length +
                    " remaining elements to be tested in  iteration " + iteration);

                returnedTestElement = availableElements[between(0, availableElements.length)];
            }

        } else {

            const iteration = 0;
            const testDefinitions = await findAllActiveTestDefinitions();

            console.log("creating first test iteration for " + testDefinitions.length +" definitions");

            for (let i = 1; testDefinitions.length > 0 && i < testDefinitions.length; i++) {

                let testDefinition = testDefinitions[i];

                let testElement = await TestElement.create({
                    test_id: testId,
                    test_definition_id: testDefinition.id,
                    question : testDefinition.question,
                    answer : testDefinition.answer,
                    iteration: iteration
                })

                if (returnedTestElement == undefined) {
                    returnedTestElement = testElement;
                }
            }
        }

        let testElementsAndTemplate = undefined;

        if(returnedTestElement != undefined) {

            testElementsAndTemplate = returnedTestElement;
        }

        return testElementsAndTemplate;

    } catch (error) {
        console.error("Failed to get user list", error);
        throw error;
    }

}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}


exports.findTestsByUserId = findTestsByUserId;
exports.createTest = createTest;
exports.findTestById = findTestById;
exports.getCurrentTestIteration = getCurrentTestIteration;

exports.runTest = runTest;