const {Sequelize} = require('sequelize');

const {findAllUsers, findUserById} = require('./UserService');
const {findTestsByUserId} = require('./TestService');
const {findTestElementsByTestId} = require('./TestElementService');

const {findByTestId, getMetadataFromList} = require('./TestMetadataService')

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

    constructor(user, test, testElements, metadata) {

        this.test = test;
        this.user = user;
        this.testElements = testElements;
        this.metadata = metadata;
    }
}

const exportTestCsv = async () => {

    const fields = [
        {
            label: 'login',
            value: 'login'
        },
        {
            label: 'teacher id',
            value: 'teacher_id'
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
            label: 'control group',
            value: 'control'
        },
        {
            label: 'test date',
            value: 'test_date'
        },
        {
            label: 'test phase',
            value: 'test_phase'
        },        {
            label: 'test id',
            value: 'test_id'
        },        {
            label: 'second test id',
            value: 'second_test_id'
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
            label: 'total number of words',
            value: 'numberOfElements'
        },
        {
            label: 'number of tested words',
            value: 'numberOfNonRepeatedElements'
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
        },
        {
            label: 'confidence',
            value: 'confidence'
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

    for(let i = 0; data != undefined && data != null && i < data.length; i++) {

        let element = data[i];

        const test = element.test;

        const user = element.user;
        const testElements = element.testElements;
        const metadata = element.metadata;

        let iteration = 0;
        let stopLoop = false;

        while (!stopLoop) {

            const iterationElements = testElements.filter(testElement => testElement.iteration == iteration);

            if (iterationElements.length > 0) {

                let exportEntry = {};

                //
                // user
                //


                exportEntry.teacher_id = user.parent;
                exportEntry.login = user.login;
                exportEntry.age = user.age;
                exportEntry.sex = user.sex;
                exportEntry.level = user.level;
                exportEntry.language = user.language;
                exportEntry.control = user.is_control ? "yes" : "no";

                //
                // tests
                //

                exportEntry.test_date = getFormattedDate(test.createdAt);
                exportEntry.test_phase = test.is_first_step ? 1 : 2;
                exportEntry.test_id = test.id;
                exportEntry.second_test_id = test.children_id;

                exportEntry.numberOfElements = iterationElements.length;

                exportEntry.numberOfNonRepeatedElements = iterationElements.filter(iterationElement => {
                    return !iterationElement.is_a_repeat
                }).length;

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

                //
                // metadata
                //

                // confidence
                const confidenceMetadata = await getMetadataFromList('confidence',metadata);
                exportEntry.confidence = confidenceMetadata != undefined ? confidenceMetadata.value : '';

                entries.push(exportEntry);

            } else {
                stopLoop = true;
            }

            iteration++;
        }
    }

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

                if (tests[t].is_completed) {

                    currTest = tests[t];

                    const testElements = await findTestElementsByTestId(currTest.id);
                    const metadata = await findByTestId(currTest.id)

                    if (testElements != null && testElements.length > 0) {
                        entries.push(new ExportDataEntry(currUser, currTest, testElements, metadata));
                    }
                }
            }
        }

    } catch (error) {
        console.error("Failed to get list of users", error);
        throw error;
    }


    return entries;
}


const getFormattedDate = (dateStr) =>  {

    let date = new Date(dateStr);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

exports.getTestData = getTestData;
exports.ExportDataEntry = ExportDataEntry;
exports.exportTests = exportTests;
exports.exportTestCsv = exportTestCsv;





