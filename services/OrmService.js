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
        type: DataTypes.INTEGER,
    },
    sex: {
        type: DataTypes.STRING,
    },
    level: {
        type: DataTypes.STRING,
    }
}, {

    sequelize, // We need to pass the connection instance
    modelName: 'user', // We need to choose the model name,
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


//
// export
//
exports.sequelize = sequelize;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;