const {QueryTypes, Sequelize, DataTypes, Model} = require('sequelize');


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
        type: DataTypes.STRING,
        allowNull: false
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

const findAllTestDefinitionSet = async () => {

    try {
        const testDefinitionsSet = await TestDefinitionSet.findAll({
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


exports.findAllTestDefinitionSet = findAllTestDefinitionSet;
exports.findTestDefinitionSetById = findTestDefinitionSetById;

