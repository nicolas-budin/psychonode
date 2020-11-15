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
    is_a_repeat: {
        type: DataTypes.BOOLEAN
    },
    is_redisplay: {
        type: DataTypes.BOOLEAN
    },
    usage_counter: {
        type: DataTypes.INTEGER
    },
    question: {
        type: DataTypes.TEXT
    },
    answer: {
        type: DataTypes.TEXT
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
    return getTestElements(testId, iteration, true, false, false)
}

const getRedoAndRedisplayTestElements = (testId, iteration) => {
    return sequelize.query(
        "select distinct te.*\n" +
        "from test_definition td,\n" +
        "     test t,\n" +
        "     test_element te\n" +
        "where t.id = :testId\n" +
        "  and te.test_id = t.id\n" +
        "  and te.test_definition_id = td.id\n" +
        "  and (te.iteration = :iteration or te.iteration = :previousIteration) \n" +
        "  and te.is_done = true\n" +
        "  and (te.is_redisplay = true or te.is_redo = true) \n" +
        "  and te.is_success = true\n" +
        "order by td.id asc;",
        {
            type: QueryTypes.SELECT,
            replacements: {testId: testId, iteration: iteration, previousIteration: (iteration - 1)},
            logging: console.log,
            raw: false
        });
}


const getAvailableTestElements = (testId, iteration) => {
    return getTestElements(testId, iteration, false, undefined, undefined)
}
const getTestElements = (testId, iteration, isDone, isSuccess, isARepeat) => {

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
        ((isSuccess != undefined) ? "  and te.is_success = :isSuccess\n" : "\n") +
        ((isARepeat != undefined) ? "  and te.is_a_repeat = :isARepeat\n" : "\n") +
        "order by td.id asc;",
        {
            type: QueryTypes.SELECT,
            replacements: {testId: testId, iteration: iteration, isDone: isDone, isSuccess: isSuccess, isARepeat: isARepeat},
            logging: console.log,
            raw: false
        });
}

//
// export
//

exports.findTestElementsByTestId = findTestElementsByTestId;
exports.findTestElementById = findTestElementById;
exports.getFailedTestElements = getFailedTestElements;
exports.getAvailableTestElements = getAvailableTestElements;
exports.TestElement = TestElement;
exports.getRedoAndRedisplayTestElements = getRedoAndRedisplayTestElements;


