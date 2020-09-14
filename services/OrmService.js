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
    freezeTableName: true
});


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


class Test extends Model {
}

Test.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    freezeTableName: true
});


class TestElement extends Model {
}

TestElement.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    freezeTableName: true
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

const findTestDefinitionById = function (id) {
    return new Promise((success, error) => {
        TestDefinition.findByPk(id).then(success).catch(error);
    });
}


const findAvailableTestDefinitionsByTestId = function (testId) {
    return new Promise((success, error) => {
        sequelize.query("select *\n" +
            "from test_definition td\n" +
            "where td.id not in (select td.id\n" +
            "                    from test_definition td,\n" +
            "                         test t,\n" +
            "                         test_element te\n" +
            "                    where t.id = :testId\n" +
            "                      and te.test_id = t.id\n" +
            "                      and te.test_definition_id = td.id\n" +
            "                    order by td.id asc)",
            {
                replacements: {testId: testId},
                model: TestDefinition,
                mapToModel: true,
                logging: console.log
            }).then(success).catch(error);
    });
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

const findTestElementById = function (id) {
    return new Promise((success, error) => {
        TestElement.findByPk(id).then(success).catch(error);
    });
}

const createTestElement = function (testDefinitionId, testId) {
    return new Promise((success, error) => {

        try {
            let  testElement =TestElement.create({test_id: testId, test_definition_id : testDefinitionId})
            success(testElement);

        } catch(exception) {
            error(exception)
        }
    });
}

const findAvailableTestElementsAndTemplatesByTestId = function (testId) {
    return new Promise((success, error) => {
        sequelize.query("select t.id as test_id, te.id as test_element_id, td.id as test_definition_id, te.user_answer, td.question, td.answer\n" +
            "from test t,\n" +
            "     test_element te,\n" +
            "     test_definition td\n" +
            "where t.id = :testId\n" +
            "  and te.test_definition_id = td.id\n" +
            "  and te.is_success = false\n" +
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
exports.findAvailableTestDefinitionsByTestId = findAvailableTestDefinitionsByTestId;
exports.findTestDefinitionById = findTestDefinitionById;

exports.findTestsByUserId = findTestsByUserId;
exports.findAvailableTestsByUserId = findAvailableTestsByUserId;

exports.findTestElementsByTestId = findTestElementsByTestId;
exports.findTestElementById = findTestElementById;
exports.createTestElement = createTestElement;

exports.findAvailableTestElementsAndTemplatesByTestId = findAvailableTestElementsAndTemplatesByTestId;