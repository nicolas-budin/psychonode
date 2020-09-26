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


const findAllUsers = async () => {

    try {

        const users = await User.findAll({
            order: [['id', 'ASC']]
        });

        return users;

    } catch (error) {
        console.error("Failed to get user list", error);
        throw error;
    }

}

const findUserById = function (id) {
    return new Promise((success, error) => {
        User.findByPk(id).then(success).catch(error);
    });
}

exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;

