const {Sequelize} = require('sequelize');

const {findAllUsers} = require('./UserService');
const {findTestsByUserId} = require('./TestService');
const {findTestElementsByTestId} = require('./TestElementService');

const { Parser } = require('json2csv');

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
    numberOfElements;

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
            label: 'sex',
            value: 'gender'
        },
        {
            label: 'number of words',
            value: 'numberOfElements'
        }
    ];

    const data = await exportTests();

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);

    return csv;
}


const exportTests = async () => {

    let entries = new Array();

    const data = await getTestData();

    data.forEach(element => {

        let exportEntry = new ExportEntry();

        const user = element.user;

        exportEntry.login = user.login;
        exportEntry.age = user.age;
        exportEntry.sex = user.sex;

        const testElements = element.testElements;
        exportEntry.numberOfElements = testElements.length;

        entries.push(exportEntry);
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





