const {QueryTypes, Sequelize, DataTypes, Model} = require('sequelize');


var {findTestDefinitionBySetId} = require('./TestDefinitionService')


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


/**
 * a set of test definitions, i.e. groups a list of test definitions
 */

class TestDefinitionSet extends Model {
}

TestDefinitionSet.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {

    sequelize,
    modelName: 'test_definition_set',
    freezeTableName: true
});

const findAllTestDefinitionSetAndDefinitions = async (language) => {

    try {
        const testDefinitionsSets = await findAllTestDefinitionSet(language);
        for(let i = 0; i < testDefinitionsSets.length; i++) {
            const currTestDefinitionsSet = testDefinitionsSets[i];
            const TestDefinitionSetAnDefinitions = await findTestDefinitionSetAnDefinitionsById(currTestDefinitionsSet.id);
            currTestDefinitionsSet.testDefinitions = TestDefinitionSetAnDefinitions.testDefinitions;
        }

        return testDefinitionsSets;

    } catch (error) {
        console.error("Failed to get test definition sets", error);
        throw error;
    }

}


const findAllTestDefinitionSet = async (language) => {

    try {
        const testDefinitionsSet = await TestDefinitionSet.findAll({
            where: {
                language: language
            },
            order: [['id', 'ASC']]
        });

        return testDefinitionsSet;

    } catch (error) {
        console.error("Failed to get test definition sets", error);
        throw error;
    }

}

const findTestDefinitionSetById = function (id) {
    return new Promise((success, error) => {
        TestDefinitionSet.findByPk(id).then(success).catch(error);
    });
}

const findTestDefinitionSetAnDefinitionsById = async (id) => {

    try {

        const testDefinitionsSet = await findTestDefinitionSetById(id);

        const testDefinitions = await findTestDefinitionBySetId(id);

        return {testDefinitionsSet: testDefinitionsSet, testDefinitions: testDefinitions};

    } catch (error) {
        console.error("Failed to get test definition sets", error);
        throw error;
    }

}


exports.findAllTestDefinitionSet = findAllTestDefinitionSet;
exports.findTestDefinitionSetById = findTestDefinitionSetById;
exports.findTestDefinitionSetAnDefinitionsById = findTestDefinitionSetAnDefinitionsById;
exports.TestDefinitionSet = TestDefinitionSet;
exports.findAllTestDefinitionSetAndDefinitions = findAllTestDefinitionSetAndDefinitions;

