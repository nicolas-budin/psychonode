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
    iteration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_done: {
        type: DataTypes.BOOLEAN
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

const getFailedTestElements = (testId, iteration) => {
    return getTestElements(testId, iteration, true, false)
}

const getAvailableTestElements = (testId, iteration) => {
    return getTestElements(testId, iteration, false, false)
}
const getTestElements = (testId, iteration, isDone, isSuccess) => {

    return sequelize.query(
        "select te.*\n" +
        "from test_definition td,\n" +
        "     test t,\n" +
        "     test_element te\n" +
        "where t.id = :testId\n" +
        "  and te.test_id = t.id\n" +
        "  and te.test_definition_id = td.id\n" +
        "  and te.iteration = :iteration\n" +
        "  and te.is_done = :isDone\n" +
        "  and te.is_success = :isSuccess\n" +
        "order by td.id asc;",
        {
            type: QueryTypes.SELECT,
            replacements: {testId: testId, iteration: iteration, isDone: isDone, isSuccess: isSuccess},
            logging: console.log,
            raw: false
        });
}


const findTestElementsAndTemplateByTestElementId = function (testElementId) {
    return sequelize.query("select t.id as test_id, te.id as test_element_id, td.id as test_definition_id, te.user_answer, td.question, td.answer\n" +
        "from test t,\n" +
        "     test_element te,\n" +
        "     test_definition td\n" +
        "where te.id = :testElementId" +
        "  and te.test_id = t.id\n" +
        "  and te.test_definition_id = td.id",
        {
            type: QueryTypes.SELECT,
            replacements: {testElementId: testElementId},
            logging: console.log,
            raw: false
        });
}


const findTestElementsAndTemplateByTestId = function (testId) {
    return sequelize.query("select te.*, td.question, td.answer\n" +
        "from test t,\n" +
        "     test_element te,\n" +
        "     test_definition td\n" +
        "where t.id = :testId" +
        "  and te.test_id = t.id\n" +
        "  and te.test_definition_id = td.id\n" +
        "order by te.id desc;",
        {
            type: QueryTypes.SELECT,
            replacements: {testId: testId},
            logging: console.log,
            raw: false
        });
}


//
// export
//

exports.findTestElementsByTestId = findTestElementsByTestId;
exports.findTestElementById = findTestElementById;
exports.findTestElementsAndTemplateByTestElementId = findTestElementsAndTemplateByTestElementId;
exports.getFailedTestElements = getFailedTestElements;
exports.getAvailableTestElements = getAvailableTestElements;
exports.TestElement = TestElement;
exports.findTestElementsAndTemplateByTestId = findTestElementsAndTemplateByTestId;


