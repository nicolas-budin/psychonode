const { Sequelize, DataTypes, Model } = require('sequelize');


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

class User extends Model {
}

User.init({

    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    age: {
        type: DataTypes.INTEGER
    },
    sex: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.STRING
    }
}, {

    sequelize, // connection instance
    modelName: 'user', // model name,
    freezeTableName: true,
    timestamps: false
});



class TestDefinition extends Model {
}

TestDefinition.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    test_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

    sequelize,
    modelName: 'test_definition',
    freezeTableName: true,
    timestamps: false
});




//
// methods
//

const findAllUsers = (success, error) => {
    User.findAll().then(success).catch(error);

}

const findUserById = function (id) {
    return new Promise((success, error) => {
        User.findByPk(id).then(success).catch(error);
    });
}


const findTestDefinitionById = function (testId) {
    return new Promise((success, error) => {
        TestDefinition.findAll({
            where: {
                test_id: testId
            }
        }).then(success).catch(error);
    });
}


findTestDefinitionById(1).then(defs => console.log(defs));


//
// export
//
exports.sequelize = sequelize;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;

exports.findTestDefinitionById = findTestDefinitionById;