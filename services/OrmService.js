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
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
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
    freezeTableName: true,
    timestamps: false
});


class Test extends Model {
}

Test.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
    freezeTableName: true,
    timestamps: false
});


class TestElement extends Model {
}

TestElement.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    test_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    test_definition_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_success: {
        type: DataTypes.BOOLEAN
    },
    is_redo: {
        type: DataTypes.BOOLEAN
    },
    is_redisplay: {
        type: DataTypes.BOOLEAN
    },
    user_answer: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {

    sequelize,
    modelName: 'test_element',
    freezeTableName: true,
    timestamps: false
});


//
// methods
//

const findAllUsers = (success, error) => {
    User.findAll({
        order: [['id', 'ASC']]
    }).then(success).catch(error);

}

const findUserById = function (id) {
    return new Promise((success, error) => {
        User.findByPk(id).then(success).catch(error);
    });
}


const findAllTestDefinitions = (success, error) => {
    TestDefinition.findAll({
        order: [['id', 'ASC']]
    }).then(success).catch(error);

}


const findTestsByUserId = function (userId) {
    return new Promise((success, error) => {
        Test.findAll({
            where: {
                user_id: userId
            },
            order: [['id', 'DESC']]
        }).then(success).catch(error);
    });
}

const findAvailableTestsByUserId = function (userId) {
    return new Promise((success, error) => {
        Test.findAll({
            where: {
                user_id: userId,
                is_aborted: false,
                is_completed: false
            },
            order: [['id', 'DESC']]
        }).then(success).catch(error);
    });
}

const findTestElementsByTestId = function (testId) {
    return new Promise((success, error) => {
        TestElement.findAll({
            where: {
                test_id: testId
            },
            order: [['id', 'DESC']]
        }).then(success).catch(error);
    });
}


const findAvailableTestElementsAndTemplatesByTestId = function (testId) {
    return new Promise((success, error) => {
        sequelize.query("select t.id, te.user_answer, td.question, td.answer\n" +
            "from test t,\n" +
            "     test_element te,\n" +
            "     test_definition td\n" +
            "where t.id = 1\n" +
            "  and te.test_definition_id = td.id\n" +
            "  and te.is_success = false\n" +
            "  and te.updatedAt is NULL\n" +
            "order by td.id asc",
            {
                type: QueryTypes.SELECT,
                replacements: {testId: testId},
                logging: console.log,
                raw: false
            }).then(success).catch(error);
    });
}


//
// export
//
exports.sequelize = sequelize;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;

exports.findAllTestDefinitions = findAllTestDefinitions;

exports.findTestsByUserId = findTestsByUserId;
exports.findAvailableTestsByUserId = findAvailableTestsByUserId;

exports.findTestElementsByTestId = findTestElementsByTestId;

exports.findAvailableTestElementsAndTemplatesByTestId = findAvailableTestElementsAndTemplatesByTestId;