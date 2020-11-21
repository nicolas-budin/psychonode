const {QueryTypes, Sequelize, DataTypes, Model} = require('sequelize');

const {getRedoAndRedisplayTestElements, TestElement, getAvailableTestElements, getFailedTestElements} = require('./TestElementService');

const {findAllActiveTestDefinitions} = require('./TestDefinitionService');

const {findUserById} = require('./UserService')


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




class TestMetadata extends Model {
}

TestMetadata.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    test_id: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.STRING
    },
    identifier: {
        type: DataTypes.STRING
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {

    sequelize,
    modelName: 'test_metadata',
    freezeTableName: true
});

//
// methods
//

const findByTestId = async (testId) => {

    try {
        const tests = TestMetadata.findAll({
            where: {
                test_id: testId
            },
            order: [['id']]
        });

        return tests;

    } catch (error) {
        console.error("Failed to get metadata for test: " + testId, error);
        throw error;
    }
}


const findById = async (id) => {

    try {
        const testMetadata = TestMetadata.findByPk(id);
        return testMetadata;

    } catch (error) {
        console.error("Failed to get testMetadata for id: " + id, error);
        throw error;
    }
}


const getMetadataFromList = async (identifier, metadataList) => {

    try {
        const element = (metadataList != undefined && metadataList != null && identifier != undefined && identifier != null && metadataList.filter(element => element.identifier === identifier).length == 1) ? metadataList.filter(element => element.identifier === identifier)[0] : undefined;
        return element;
    } catch (error) {
        console.error("Failed to get metadata", error);
        throw error;
    }
}


const createTestMetaData = async (testId, identifier, value) => {

    try {

        const testMetadata = await TestMetadata.create({test_id: testId, identifier: identifier, value : value});
        return testMetadata;


    } catch (error) {
        console.error("Failed to create metadata", error);
        throw error;
    }
}


exports.findByTestId = findByTestId;
exports.findById = findById;
exports.createTestMetaData = createTestMetaData;
exports.getMetadataFromList = getMetadataFromList;
