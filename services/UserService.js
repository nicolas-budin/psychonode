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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    setId: {
        type: DataTypes.INTEGER,
    },
    parent: {
        type: DataTypes.INTEGER,
    },
    language: {
        type: DataTypes.STRING
    },
    is_admin: {
        type: DataTypes.BOOLEAN
    },
    is_active: {
        type: DataTypes.BOOLEAN
    },
    is_control: {
        type: DataTypes.BOOLEAN
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
    degree: {
        type: DataTypes.STRING
    },
    grade: {
        type: DataTypes.INTEGER
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


const findUserByLogin = async (login) => {
    try {
        const users = await User.findAll({
            where: {
                login: login
            },
            order: [['id', 'DESC']]
        });

        return users[0];

    } catch (error) {
        console.error("Failed to get tests for user: " + login, error);
        throw error;
    }
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.is_admin) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.loggedIn = loggedIn;
exports.isAdmin = isAdmin;
exports.User = User;
exports.findUserByLogin = findUserByLogin


