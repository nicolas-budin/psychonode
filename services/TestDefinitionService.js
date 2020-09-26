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


//
// entities
//



class TestDefinition extends Model {
}

TestDefinition.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
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
    modelName: 'test_definition',
    freezeTableName: true
});





const findAllTestDefinitions = async () => {

    try {
        const testDefinitions = await TestDefinition.findAll({
            order: [['id', 'ASC']]
        });

        return testDefinitions;

    } catch (error) {
        console.error("Failed to get test definitions", error);
        throw error;
    }

}


const findTestDefinitionById = function (id) {
    return new Promise((success, error) => {
        TestDefinition.findByPk(id).then(success).catch(error);
    });
}


exports.findAllTestDefinitions = findAllTestDefinitions;
exports.findTestDefinitionById = findTestDefinitionById;

