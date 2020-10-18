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
 * Stores list of available languages
 */

class LanguageCv extends Model {
}

LanguageCv.init({

    language: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {

    sequelize,
    modelName: 'language_cv',
    freezeTableName: true
});

const findAllLanguages = async () => {

    try {
        const languages = await LanguageCv.findAll({
            order: [['language', 'ASC']]
        });

        return languages;

    } catch (error) {
        console.error("Failed to get list of languages", error);
        throw error;
    }

}

exports.findAllLanguages = findAllLanguages;


