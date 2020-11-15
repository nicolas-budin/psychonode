const {Sequelize} = require('sequelize');

const {findAllUsers, findUserById} = require('./UserService');
const {findTestsByUserId} = require('./TestService');
const {findTestElementsByTestId} = require('./TestElementService');

const {Parser} = require('json2csv');

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


class ExportDataEntry {

    constructor(user, test, testElements) {

        this.test = test;
        this.user = user;
        this.testElements = testElements;
    }
}

class ExportEntry {


    login;
    age;
    sex;
    level;
    group;
    language;
    numberOfElements;
    numbOfSuccess;
    numberOfRedo;
    numberOfRedisplay;

}

const exportTestCsv = async () => {

    const fields = [
        {
            label: 'login',
            value: 'login'
        },
        {
            label: 'age',
            value: 'age'
        },
        {
            label: 'gender',
            value: 'sex'
        },
        {
            label: 'level',
            value: 'level'
        },
        {
            label: 'group',
            value: 'group'
        },
        {
            label: 'language',
            value: 'language'
        },
        {
            label: 'iteration',
            value: 'iteration'
        },
        {
            label: 'number of words',
            value: 'numberOfElements'
        },
        {
            label: 'numbOfSuccess',
            value: 'numbOfSuccess'
        },
        {
            label: 'numberOfRedo',
            value: 'numberOfRedo'
        },
        {
            label: 'numberOfRedisplay',
            value: 'numberOfRedisplay'
        },
        {
            label: 'numberOfDrop',
            value: 'numberOfDrop'
        }
    ];

    const data = await exportTests();

    const json2csv = new Parser({fields});
    const csv = json2csv.parse(data);

    return csv;
}


const exportTests = async () => {

    let entries = new Array();

    const data = await getTestData();

    data.forEach(element => {

        const user = element.user;
        const testElements = element.testElements;

        let iteration = 0;
        let stopLoop = false;

        while (!stopLoop) {

            const iterationElements = testElements.filter(testElement => testElement.iteration == iteration);

            if (iterationElements.length > 0) {

                let exportEntry = new ExportEntry();

                exportEntry.login = user.login;
                exportEntry.age = user.age;
                exportEntry.sex = user.sex;
                exportEntry.level = user.level;
                exportEntry.language = user.language;

                exportEntry.numberOfElements = iterationElements.length;

                exportEntry.iteration = (iteration + 1);

                exportEntry.numbOfSuccess = iterationElements.filter(iterationElement => {
                    return iterationElement.is_success && !iterationElement.is_a_repeat
                }).length;

                exportEntry.numberOfRedo = iterationElements.filter(iterationElement => {
                    return iterationElement.is_success && iterationElement.is_redo && !iterationElement.is_a_repeat
                }).length;

                exportEntry.numberOfRedisplay = iterationElements.filter(iterationElement => {
                    return iterationElement.is_success && iterationElement.is_redisplay && !iterationElement.is_a_repeat
                }).length;

                exportEntry.numberOfDrop = iterationElements.filter(iterationElement => {
                    return iterationElement.is_success && !iterationElement.is_redisplay && !iterationElement.is_redo && !iterationElement.is_a_repeat
                }).length;

                entries.push(exportEntry);

            } else {
                stopLoop = true;
            }

            iteration++;
        }


    })

    return entries;

}


const getTestData = async () => {

    let entries = new Array();

    try {

        const users = await findAllUsers();

        let currUser;
        let currTest;
        for (let i = 0; i < users.length; i++) {

            currUser = users[i];
            currTest = undefined;

            const tests = await findTestsByUserId(currUser.id)

            for (let t = 0; t < tests.length; t++) {

                if (tests[t].is_first_step == true && tests[t].is_completed) {
                    currTest = tests[t];
                    break;
                }
            }

            if (currTest != undefined) {

                const testElements = await findTestElementsByTestId(currTest.id);

                if (testElements != null && testElements.length > 0) {
                    entries.push(new ExportDataEntry(currUser, currTest, testElements));
                }
            }
        }

    } catch (error) {
        console.error("Failed to get list of users", error);
        throw error;
    }


    return entries;
}

exports.getTestData = getTestData;
exports.ExportDataEntry = ExportDataEntry;
exports.exportTests = exportTests;
exports.exportTestCsv = exportTestCsv;





